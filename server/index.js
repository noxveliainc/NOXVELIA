import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import sanitize from 'mongo-sanitize';
import { createServer } from 'http';
import { Server } from 'socket.io';
import crypto from 'node:crypto';

import authRoutes from './routes/auth.js';
import anunciosRoutes from './routes/anuncios.js';
import usersRoutes from './routes/users.js';
import stripeRoutes from './routes/stripe.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import notificacoesRoutes from './routes/notificacoes.js';
import analyticsRoutes from './routes/analytics.js';
import sponsorsRoutes from './routes/sponsors.js';
import systemRoutes from './routes/system.js';
import { requestMetrics } from './middleware/metrics.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { verificarJwt } from './utils/jwt.js';

// 🌟 IMPORTAÇÃO DO MOTOR DO TEMPO (CRON)
import { iniciarCronJobs } from './middleware/cron.js';

const app = express();
const httpServer = createServer(app);

app.set('trust proxy', 1);
app.disable('x-powered-by');

const production = process.env.NODE_ENV === 'production';
const allowedOrigins = new Set([
  'https://www.noxvelia.com',
  'https://noxvelia.com',
  process.env.CLIENT_URL,
  ...(!production ? ['http://localhost:5173', 'http://localhost:4173'] : []),
].filter(Boolean));
const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.has(origin)) return callback(null, true);
  return callback(new Error('Origem nao autorizada por CORS.'));
};

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const io = new Server(httpServer, {
  cors: { origin: corsOrigin, credentials: true },
});

app.use(morgan(production ? 'combined' : 'dev'));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com', 'https://www.google.com', 'https://www.gstatic.com', 'https://cdnjs.buymeacoffee.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'https://noxvelia.onrender.com', 'wss://noxvelia.onrender.com', 'https://api.cloudinary.com', 'https://api.stripe.com', 'https://www.google.com', 'https://nominatim.openstreetmap.org', 'https://*.basemaps.cartocdn.com'],
      frameSrc: ["'self'", 'https://js.stripe.com', 'https://www.google.com', 'https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://my.matterport.com', 'https://buymeacoffee.com'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: production ? [] : null,
    },
  },
}));
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Request-Id', req.get('X-Request-Id')?.slice(0, 80) || crypto.randomUUID());
  next();
});
app.use(compression());
app.use(requestMetrics);

// ─────────────────────────────────────────────────────────────
// WEBHOOK ANTES DO JSON — obrigatório para o Stripe validar a assinatura
// ─────────────────────────────────────────────────────────────
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ─────────────────────────────────────────────────────────────
// ROTAS
// ─────────────────────────────────────────────────────────────
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/stripe', stripeRoutes);       
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/system', systemRoutes);

app.get('/', (req, res) => res.status(200).json({ status: 'OK', mensagem: 'API NOXVELIA ativa!' }));

app.use(notFoundHandler);
app.use(errorHandler);

// ─────────────────────────────────────────────────────────────
// SOCKET.IO
// ─────────────────────────────────────────────────────────────
io.use((socket, next) => {
  try {
    const header = socket.handshake.headers.authorization;
    const token = socket.handshake.auth?.token || (header?.startsWith('Bearer ') ? header.slice(7) : null);
    if (!token) return next(new Error('Autenticacao necessaria.'));
    socket.user = verificarJwt(token);
    return next();
  } catch {
    return next(new Error('Sessao invalida ou expirada.'));
  }
});

io.on('connection', (socket) => {
  socket.join(String(socket.user.id));
  socket.on('entrar_sala_pessoal', () => socket.join(String(socket.user.id)));
});

// ─────────────────────────────────────────────────────────────
// ARRANQUE E MOTOR DO TEMPO
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const iniciarServidor = async () => {
  try {
    if (!MONGODB_URI) throw new Error('A variável MONGODB_URI não foi encontrada no .env');

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET deve existir e conter pelo menos 32 caracteres.');
    }

    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ [DATABASE] MongoDB conectado com sucesso.');

    // 🌟 LIGA O MOTOR DO TEMPO (CRON)
    iniciarCronJobs();

    httpServer.listen(PORT, () => {
      console.log(`🚀 [SERVER] Motor ativo na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ [FATAL ERROR] Falha ao iniciar a plataforma:', error.message);
    process.exit(1);
  }
};

iniciarServidor();

process.on('SIGINT', async () => {
  console.log('\n⚠️ [SERVER] A encerrar. Fechando conexões...');
  await mongoose.connection.close();
  process.exit(0);
});

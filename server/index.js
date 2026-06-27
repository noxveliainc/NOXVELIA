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

import authRoutes from './routes/auth.js';
import anunciosRoutes from './routes/anuncios.js';
import usersRoutes from './routes/users.js';
import stripeRoutes from './routes/stripe.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import notificacoesRoutes from './routes/notificacoes.js';
import analyticsRoutes from './routes/analytics.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// 🌟 IMPORTAÇÃO DO MOTOR DO TEMPO (CRON)
import { iniciarCronJobs } from './middleware/cron.js';

const app = express();
const httpServer = createServer(app);

app.set('trust proxy', 1);

app.use(cors({
  origin: ['https://www.noxvelia.com', 'http://localhost:5173'],
  credentials: true,
}));

const io = new Server(httpServer, {
  cors: { origin: ['https://www.noxvelia.com', 'http://localhost:5173'], credentials: true },
});

app.use(morgan('dev'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// ─────────────────────────────────────────────────────────────
// WEBHOOK ANTES DO JSON — obrigatório para o Stripe validar a assinatura
// ─────────────────────────────────────────────────────────────
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use((req, res, next) => {
  req.body = sanitize(req.body);
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

app.get('/', (req, res) => res.status(200).json({ status: 'OK', mensagem: 'API NOXVELIA ativa!' }));

app.use(notFoundHandler);
app.use(errorHandler);

// ─────────────────────────────────────────────────────────────
// SOCKET.IO
// ─────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  socket.on('entrar_sala_pessoal', (userId) => {
    if (userId) socket.join(userId);
  });
});

// ─────────────────────────────────────────────────────────────
// ARRANQUE E MOTOR DO TEMPO
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const iniciarServidor = async () => {
  try {
    if (!MONGODB_URI) throw new Error('A variável MONGODB_URI não foi encontrada no .env');

    await mongoose.connect(MONGODB_URI);
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
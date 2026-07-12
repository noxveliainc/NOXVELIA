import jwt from 'jsonwebtoken';

export const JWT_OPTIONS = Object.freeze({
  algorithms: ['HS256'],
  issuer: 'noxvelia-api',
  audience: 'noxvelia-web',
});

export const assinarToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, {
  algorithm: 'HS256',
  issuer: JWT_OPTIONS.issuer,
  audience: JWT_OPTIONS.audience,
  expiresIn: process.env.JWT_EXPIRES_IN || '12h',
});

export const verificarJwt = (token) => jwt.verify(token, process.env.JWT_SECRET, JWT_OPTIONS);

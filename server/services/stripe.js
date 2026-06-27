import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Só inicializa se a chave existir no .env
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null;
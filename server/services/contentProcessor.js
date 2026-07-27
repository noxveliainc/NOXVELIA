import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

export const CONTENT_PROCESSING_MODEL = process.env.CONTENT_PROCESSING_MODEL || 'gemini-2.5-flash';
export const motorProcessamento = apiKey ? new GoogleGenAI({ apiKey }) : null;
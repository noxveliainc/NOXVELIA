import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { getImageStorageConfig } from '../config/imageStorage.js';

const normalizeKey = (key) => {
  const clean = String(key || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!clean || clean.includes('..') || clean.includes('//')) throw new Error('Chave de imagem invalida.');
  return clean;
};

class LocalImageStorage {
  constructor(config) {
    this.provider = 'local';
    this.basePath = path.resolve(process.cwd(), config.localPath);
    this.publicBaseUrl = config.publicBaseUrl;
  }

  async save(key, buffer) {
    const normalized = normalizeKey(key);
    const target = path.resolve(this.basePath, normalized);
    if (!target.startsWith(this.basePath)) throw new Error('Caminho de imagem invalido.');
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, buffer, { flag: 'wx' });
    return { key: normalized, sizeBytes: buffer.length };
  }

  async read(key) {
    const normalized = normalizeKey(key);
    const target = path.resolve(this.basePath, normalized);
    if (!target.startsWith(this.basePath)) throw new Error('Caminho de imagem invalido.');
    return fs.readFile(target);
  }

  async delete(key) {
    const normalized = normalizeKey(key);
    const target = path.resolve(this.basePath, normalized);
    if (!target.startsWith(this.basePath)) throw new Error('Caminho de imagem invalido.');
    await fs.rm(target, { force: true });
  }

  async exists(key) {
    try {
      await this.read(key);
      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(key) {
    return `${this.publicBaseUrl}/${normalizeKey(key)}`;
  }
}

class S3ImageStorage {
  constructor(config) {
    this.provider = 's3';
    this.config = config.s3;
    this.publicBaseUrl = config.s3.publicBaseUrl || config.publicBaseUrl;
    if (!this.config.bucket) throw new Error('S3_BUCKET em falta para IMAGE_STORAGE_DRIVER=s3.');
  }

  endpointFor(key) {
    const normalized = normalizeKey(key);
    if (!this.config.endpoint) {
      return new URL(`https://${this.config.bucket}.s3.${this.config.region || 'us-east-1'}.amazonaws.com/${encodePath(normalized)}`);
    }
    const endpoint = new URL(this.config.endpoint);
    const pathPrefix = endpoint.pathname.replace(/\/+$/, '');
    if (this.config.forcePathStyle) {
      endpoint.pathname = `${pathPrefix}/${this.config.bucket}/${encodePath(normalized)}`;
    } else {
      endpoint.hostname = `${this.config.bucket}.${endpoint.hostname}`;
      endpoint.pathname = `${pathPrefix}/${encodePath(normalized)}`;
    }
    return endpoint;
  }

  signingKey(dateStamp) {
    const hmac = (key, value) => crypto.createHmac('sha256', key).update(value).digest();
    const kDate = hmac(`AWS4${this.config.secretAccessKey}`, dateStamp);
    const kRegion = hmac(kDate, this.config.region || 'auto');
    const kService = hmac(kRegion, 's3');
    return hmac(kService, 'aws4_request');
  }

  async request(method, key, { body, contentType, cacheControl } = {}) {
    if (!this.config.accessKeyId || !this.config.secretAccessKey) {
      throw new Error('Credenciais S3 em falta.');
    }

    const url = this.endpointFor(key);
    const payload = body ? Buffer.from(body) : Buffer.alloc(0);
    const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const canonicalHeaders = [
      cacheControl ? `cache-control:${cacheControl}` : '',
      contentType ? `content-type:${contentType}` : '',
      `host:${url.host}`,
      `x-amz-content-sha256:${payloadHash}`,
      `x-amz-date:${amzDate}`,
    ].filter(Boolean).join('\n') + '\n';
    const signedHeaders = [
      cacheControl ? 'cache-control' : '',
      contentType ? 'content-type' : '',
      'host',
      'x-amz-content-sha256',
      'x-amz-date',
    ].filter(Boolean).join(';');
    const canonicalRequest = [
      method,
      url.pathname,
      url.searchParams.toString(),
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');
    const scope = `${dateStamp}/${this.config.region || 'auto'}/s3/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      scope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');
    const signature = crypto.createHmac('sha256', this.signingKey(dateStamp)).update(stringToSign).digest('hex');
    const headers = {
      Authorization: `AWS4-HMAC-SHA256 Credential=${this.config.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
    };
    if (cacheControl) headers['cache-control'] = cacheControl;
    if (contentType) headers['content-type'] = contentType;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? payload : undefined,
    });
    if (!response.ok) throw new Error(`Storage S3 respondeu HTTP ${response.status}.`);
    return response;
  }

  async save(key, buffer) {
    const normalized = normalizeKey(key);
    await this.request('PUT', normalized, {
      body: buffer,
      contentType: 'image/webp',
      cacheControl: 'public, max-age=31536000, immutable',
    });
    return { key: normalized, sizeBytes: buffer.length };
  }

  async read(key) {
    const normalized = normalizeKey(key);
    const response = await this.request('GET', normalized);
    return Buffer.from(await response.arrayBuffer());
  }

  async delete(key) {
    const normalized = normalizeKey(key);
    await this.request('DELETE', normalized);
  }

  async exists(key) {
    try {
      const normalized = normalizeKey(key);
      await this.request('HEAD', normalized);
      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(key) {
    return `${this.publicBaseUrl}/${normalizeKey(key)}`;
  }
}

const encodePath = (key) => key.split('/').map((segment) => encodeURIComponent(segment)).join('/');

let storageInstance = null;

export const getImageStorage = () => {
  if (storageInstance) return storageInstance;
  const config = getImageStorageConfig();
  storageInstance = config.driver === 's3' ? new S3ImageStorage(config) : new LocalImageStorage(config);
  return storageInstance;
};

export const resetImageStorageForTests = () => {
  storageInstance = null;
};

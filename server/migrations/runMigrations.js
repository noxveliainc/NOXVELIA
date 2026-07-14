import Migration from '../models/Migration.js';
import * as partnershipEmails from './20260714_partnership_emails.js';

const migrations = [partnershipEmails];

export const runMigrations = async () => {
  for (const migration of migrations) {
    const exists = await Migration.findOne({ name: migration.name }).lean();
    if (exists) continue;
    await migration.up();
    await Migration.create({ name: migration.name });
    console.log(`[MIGRATIONS] Aplicada: ${migration.name}`);
  }
};

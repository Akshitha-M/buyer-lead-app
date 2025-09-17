// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

// Use POSTGRES_URL instead of DATABASE_URL
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
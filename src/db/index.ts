
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Use POSTGRES_URL instead of DATABASE_URL
const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not defined');
}

const pool = new Pool({
  connectionString: connectionString,
});

export const db = drizzle({ client: pool, schema });
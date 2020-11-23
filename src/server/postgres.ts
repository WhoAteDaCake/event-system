import { Pool } from 'pg';
import { env } from './env'

export const pgPool = new Pool({
  connectionString: env.POSTGRES_URL,
  max: env.POOL_SIZE,
  min: Math.floor(env.POOL_SIZE / 2),
});
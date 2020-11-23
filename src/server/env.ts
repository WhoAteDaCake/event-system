import * as yup from 'yup';
import { Log } from './log';
/*
  Explanations for each variable can be found in the readme.
  Environment only holds true after it's been validated by a schema
 */
export interface Environment {
  POSTGRES_URL: string;
  POSTGRES_SCHEMA: string;
  POOL_SIZE: number;
  PORT: number;
  SECRET: string;
}
// Make sure that it's validated before access
export let env = (process.env as any) as Environment;

const envSchema = yup
  .object()
  .shape({
    // postgresql://user:password@localhost:5432/db
    POSTGRES_URL: yup.string().required(),
    POSTGRES_SCHEMA: yup.string().required(),
    // Required for security purposes
    PORT: yup.number().required(),
    // Pool for postgreSQL connections
    POOL_SIZE: yup.number().required(),
    // Used for memory sessions
    SECRET: yup.string().required(),
  })
  .required();

export function validateEnv() {
  try {
    env = envSchema.validateSync(env) as Environment;
    return null;
  } catch (e) {
    return {
      msg: 'Invalid environment variables',
      path: e.path,
      errors: e.errors,
    };
  }
}

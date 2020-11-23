import pino from 'pino';

export const Log = pino({
  nestedKey: 'payload',
});
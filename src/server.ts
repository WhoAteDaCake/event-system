import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import makeMemoryStore from 'memorystore';
import session from 'express-session';
import { validateEnv, env } from './server/env'
import { Log } from './server/log';

const MemoryStore = makeMemoryStore(session);
const error = validateEnv();

if (error !== null) {
	Log.fatal(error);
	process.exit(-1);
}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = polka();

server // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		session({
    store: new MemoryStore({
      checkPeriod: 1000 * 60 * 60 * 24,
    }),
    secret: env.SECRET,
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false,
  }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

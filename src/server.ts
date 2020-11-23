import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { validateEnv } from './server/env'
import { Log } from './server/log';

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
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

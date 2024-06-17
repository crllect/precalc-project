import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';
import compression from 'compression';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();
installGlobals();

const port = parseInt(process.env.PORT as string, 10);

const viteDevServer =
	process.env.NODE_ENV === 'production'
		? undefined
		: await import('vite').then(vite =>
				vite.createServer({
					server: { middlewareMode: true }
				})
			);

const remixHandler = createRequestHandler({
	build: viteDevServer
		? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
		: // eslint-disable-next-line
			// @ts-ignore
			// eslint-disable-next-line
			await import('./build/server/index.js')
});

const app = express();
app.use(compression());
app.disable('x-powered-by');
if (viteDevServer) {
	app.use(viteDevServer.middlewares);
} else {
	app.use(
		'/assets',
		express.static('build/client/assets', {
			immutable: true,
			maxAge: '1y'
		})
	);
}

app.use(express.static('build/client', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.get('/service-worker.ts', (req: Request, res: Response) => {
	res.status(200).send('OK');
});

// handle SSR requests
app.all('*', remixHandler);
const server = createServer();
server.on('request', (req: Request, res: Response) => {
	app(req, res);
});

server.listen(port, () => {
	console.log(`Express server started on http://localhost:${port}`);
});

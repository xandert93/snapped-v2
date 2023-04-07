import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import url from 'url';
import path from 'path';
import fs from 'fs';

import {
  connectDB,
  csrfProtection,
  getCSRFToken,
  initSocketServer,
  stripeEventHandler,
} from './config/index.js';
import seedDB from './seed/index.js';

import { authRouter, apiRouter } from './routes/index.js';
import {
  clientErrorResponder,
  errorLogger,
  errorResponder,
} from './middleware/error-middleware.js';

const dirName = path.dirname(url.fileURLToPath(import.meta.url));
const { NODE_ENV, PORT } = process.env;
const inProduction = NODE_ENV === 'production';

await connectDB();
// await seedDB();

const app = express();

// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use(csrfProtection());

if (!inProduction) {
  import('colors');
  const { default: morgan } = await import('morgan');

  // app.use(morgan('dev'));
}

// app.get('/csrf-token', getCSRFToken);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.post('/stripe', stripeEventHandler); // just for now. Don't think this is how it should be in long-term
app.use(clientErrorResponder, errorLogger, errorResponder);

if (inProduction) {
  const buildDir = path.resolve(dirName, '..', 'client/build');

  app.use(compression());
  app.use(express.static(buildDir));
  app.use((req, res) => res.sendFile('index.html', { root: buildDir }));
}

const server = app.listen(PORT, () =>
  console.log(`♨️  Express Server: running! (${NODE_ENV} on:${PORT})`)
);

initSocketServer(server);

/*
- I have disabled `helmet` for now, because without configuration, it's not allowing the client to use Google Login, Facebook Login or Cloudinary scripts

- importing 'colors' executes the module code, which modifies Node's String.prototype so that we can call new methods on any String

- check response payload sizes when app functional and see if compression is required for all requests...

- retoggle morgan when I encounter server errors that may pertain to requests - for now I don't wanna see its updates

- couldn't configure the resending of the anti-CSRF token from the React client to the server. Once fixed, come back and uncomment (...and add notes!)
*/

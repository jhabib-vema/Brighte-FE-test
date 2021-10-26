import * as cors from 'cors';
import * as express from 'express';

export const server = express();

import referralRoutes from './routes/referrals';

/* Configure Express Middleware */
server.use(cors());
server.use(express.json());

/* Configure custom Api Middleware and Routes */
server.use('/referrals', referralRoutes);

export default server;

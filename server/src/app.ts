import * as express from 'express';
import * as cors from 'cors';

import { configureDI } from './config/dic';
import { lotteryModuleInit } from './module/lottery/module';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const diContainer = configureDI();
lotteryModuleInit(app, diContainer);

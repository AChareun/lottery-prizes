import * as express from 'express';
import * as cors from 'cors';

import { configureDI } from './config/dic';
import { resultModuleInit } from './module/result/module';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const diContainer = configureDI();
resultModuleInit(app, diContainer);

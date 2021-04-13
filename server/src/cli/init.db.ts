import { Sequelize } from 'sequelize/types';
import { configureDI } from '../config/dic';

require('dotenv').config();

const diContainer = configureDI();

const mainDb: Sequelize = diContainer.get('Sequelize');
diContainer.get('LotteryNameModel');
diContainer.get('LotteryTypeModel');
diContainer.get('LotteryModel');
diContainer.get('ResultModel');

mainDb.sync().catch((error) => {
    console.log(error)
});

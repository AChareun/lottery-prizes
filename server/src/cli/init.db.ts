import { Sequelize } from 'sequelize/types';
import { configureDI } from '../config/dic';

require('dotenv').config();

const diContainer = configureDI();

const mainDb: Sequelize = diContainer.get('Sequelize');
diContainer.get('ResultModel');

mainDb.sync().catch((error) => {
    console.log(error)
});
import { LotteryController } from './controller/lotteryController';
import { ResultModel, LotteryTypeModel, LotteryNameModel, LotteryModel } from './model';
import { LotteryRepository } from './repository/sequelize/lotteryRepository';
import { LotteryService } from './service/lotteryService';
import { Application } from 'express';
import { IDIContainer } from 'rsdi';

const lotteryModuleInit = (app: Application, container: IDIContainer): void => {
    const lotteryController = container.get<LotteryController>('LotteryController');

    lotteryController.configureRoutes(app);
};

export {
    LotteryController,
    LotteryService,
    LotteryRepository,
    ResultModel,
    LotteryNameModel,
    LotteryModel,
    LotteryTypeModel,
    lotteryModuleInit,
};

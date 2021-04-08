import { LotteryController } from "./controller/lotteryController";
import { ResultModel } from "./model/result";
import { LotteryRepository } from "./repository/sequelize/lotteryRepository";
import { LotteryService } from "./service/lotteryService";
import { Application } from 'express';
import { IDIContainer } from 'rsdi';

const lotteryModuleInit = (app: Application, container: IDIContainer): void => {
    const resultController = container.get<LotteryController>("ResultController");

    resultController.configureRoutes(app);
}

export { LotteryController, LotteryService, LotteryRepository, ResultModel, lotteryModuleInit };

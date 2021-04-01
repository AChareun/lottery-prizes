import { ResultController } from "./controller/resultController";
import { ResultModel } from "./model/result";
import { ResultRepository } from "./repository/sequelize/resultRepository";
import { ResultService } from "./service/resultService";
import { Application } from 'express';
import { IDIContainer } from 'rsdi';

const resultModuleInit = (app: Application, container: IDIContainer): void => {
    const resultController = container.get<ResultController>("ResultController");

    resultController.configureRoutes(app);
}

export { ResultController, ResultService, ResultRepository, ResultModel, resultModuleInit };
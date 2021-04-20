import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { ApiResponseHelper } from '../lib/apiResponse';
import { ApiErrors } from '../core/apiError';
import {
    LotteryController,
    LotteryService,
    LotteryRepository,
    ResultModel,
    LotteryTypeModel,
    LotteryNameModel,
    LotteryModel,
} from '../module/lottery/module';

function configureSequelizeDatabase(): Sequelize {
    return new Sequelize({ dialect: 'sqlite', storage: process.env.DATABASE_URL });
}

function addCommonDefinitions(container: DIContainer): void {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
        ResponseHelper: object(ApiResponseHelper).construct(ApiErrors),
    });
}

function configureResultModel(container: DIContainer): typeof ResultModel {
    return ResultModel.setup(container.get<Sequelize>('Sequelize'));
}
function configureLotteryModel(container: DIContainer): typeof LotteryModel {
    return LotteryModel.setup(container.get<Sequelize>('Sequelize'));
}
function configureLotteryNameModel(container: DIContainer): typeof LotteryNameModel {
    return LotteryNameModel.setup(container.get<Sequelize>('Sequelize'));
}
function configureLotteryTypeModel(container: DIContainer): typeof LotteryTypeModel {
    return LotteryTypeModel.setup(container.get<Sequelize>('Sequelize'));
}

function addLotteryModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        ResultModel: factory(configureResultModel),
        LotteryModel: factory(configureLotteryModel),
        LotteryNameModel: factory(configureLotteryNameModel),
        LotteryTypeModel: factory(configureLotteryTypeModel),
        LotteryRepository: object(LotteryRepository).construct(get('LotteryModel')),
        LotteryService: object(LotteryService).construct(get('LotteryRepository')),
        LotteryController: object(LotteryController).construct(
            get('LotteryService'),
            get('ResponseHelper')
        ),
    });
}

function setupAssociations(container: DIContainer) {
    const lotteryModel = container.get<typeof LotteryModel>('LotteryModel');
    const lotteryNameModel = container.get<typeof LotteryNameModel>('LotteryNameModel');
    const lotteryTypeModel = container.get<typeof LotteryTypeModel>('LotteryTypeModel');
    const resultModel = container.get<typeof ResultModel>('ResultModel');

    lotteryModel.setupAssociations(lotteryNameModel, lotteryTypeModel);
    resultModel.setupAssociations(lotteryModel);
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addLotteryModuleDefinitions(container);
    setupAssociations(container);

    return container;
}

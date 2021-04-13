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
    ResultModel.setup(container.get<Sequelize>('Sequelize'));
    ResultModel.setupAssociations(container.get<typeof LotteryModel>('LotteryModel'));

    return ResultModel;
}
function configureLotteryModel(container: DIContainer): typeof LotteryModel {
    LotteryModel.setup(container.get<Sequelize>('Sequelize'));
    LotteryModel.setupAssociations(
        container.get<typeof LotteryNameModel>('LotteryNameModel'),
        container.get<typeof LotteryTypeModel>('LotteryTypeModel')
    );

    return LotteryModel;
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

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addLotteryModuleDefinitions(container);

    return container;
}

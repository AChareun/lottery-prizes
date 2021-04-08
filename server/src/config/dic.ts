import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { ApiResponseHelper } from '../lib/apiResponse';
import { ApiErrors } from '../core/apiError';
import {
    LotteryController,
    LotteryService,
    LotteryRepository,
    ResultModel,
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

function addLotteryModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        ResultModel: factory(configureResultModel),
        LotteryRepository: object(LotteryRepository).construct(get('ResultModel')),
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

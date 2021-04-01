import { default as DIContainer, factory, object, get } from 'rsdi';
import { Sequelize } from 'sequelize';

import { ApiResponseHelper } from '../lib/apiResponse';
import { ApiErrors } from '../core/apiError';
import {
    ResultController,
    ResultService,
    ResultRepository,
    ResultModel,
} from '../module/result/module';

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

function addResultModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        ResultModel: factory(configureResultModel),
        ResultRepository: object(ResultRepository).construct(get('ResultModel')),
        ResultService: object(ResultService).construct(get('ResultRepository')),
        ResultController: object(ResultController).construct(
            get('ResultService'),
            get('ResponseHelper')
        ),
    });
}

export function configureDI(): DIContainer {
    const container = new DIContainer();

    addCommonDefinitions(container);
    addResultModuleDefinitions(container);

    return container;
}

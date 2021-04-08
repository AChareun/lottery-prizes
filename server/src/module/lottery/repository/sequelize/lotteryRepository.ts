import { DatabaseError, Op } from 'sequelize';

import { ILotteryRepository } from '../lotteryRepositoryInterface';
import { Result } from '../../entity/result';
import { IResultModelCreationAttributes, ResultModel } from '../../model/result';
import { fromModelToEntity } from '../../mapper/lotteryMapper';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../error/genericDatabaseError';

export class LotteryRepository implements ILotteryRepository {
    resultModel: typeof ResultModel;

    constructor(resultModel: typeof ResultModel) {
        this.resultModel = resultModel;
    }

    async getByDate(date: Date): Promise<Result[]> {
        let result: ResultModel[] | undefined;
        try {
            result = await this.resultModel.findAll();
        } catch (e) {
            if (e instanceof DatabaseError) {
                console.log('DATABASE ERROR:', e.message);
                console.log('SQL:', e.sql);
                console.log('QUERY PARAMETERS:', e.parameters);
            } else {
                throw e;
            }
        }

        if (result) {
            return result.map(fromModelToEntity);
        } else {
            throw new ResourceNotFoundError();
        }
    }

    async addRegistry(attributes: IResultModelCreationAttributes): Promise<Result> {
        let newResult: ResultModel | undefined;
        try {
            newResult = await this.resultModel.create(attributes);
        } catch (e) {
            if (e instanceof DatabaseError) {
                console.log('DATABASE ERROR:', e.message);
                console.log('SQL:', e.sql);
                console.log('QUERY PARAMETERS:', e.parameters);
            } else {
                throw e;
            }
        }

        if (newResult) {
            return fromModelToEntity(newResult);
        } else {
            throw new GenericDatabaseError();
        }
    }
}

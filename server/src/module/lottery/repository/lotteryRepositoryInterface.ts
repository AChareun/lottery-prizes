import { Result } from '../entity/result';
import { IResultModelCreationAttributes } from '../model/result';

export interface ILotteryRepository {
    getByDate(date: Date): Promise<Result[]>;

    addRegistry(attributes: IResultModelCreationAttributes): Promise<Result>;
}

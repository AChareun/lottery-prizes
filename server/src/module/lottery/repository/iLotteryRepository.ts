import { ILotteryResult } from '../entity/iLotteryResult';
import { ILotteryModelCreationAttributes } from '../model/lottery';
import { IResultModelCreationAttributes } from '../model/result';

export interface ILotteryRepository {
    getByDate(date: Date): Promise<ILotteryResult[]>;

    addRegistry(
        attributes: ILotteryModelCreationAttributes,
        results: IResultModelCreationAttributes[]
    ): Promise<ILotteryResult>;
}

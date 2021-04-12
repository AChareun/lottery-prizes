import { IResult } from '../entity/iLotteryResult';
import { IResultModelCreationAttributes } from '../model/result';

export function fromEntityToModel(resultEntity: IResult): IResultModelCreationAttributes {
    return {
        lotteryId: 0,
        position: resultEntity.position,
        result: Number(resultEntity.result),
    };
}

import { ILotteryModelCreationAttributes, LotteryModel } from '../model/lottery';
import { ELotteryNames, ELotteryTypes, ILotteryResult } from '../entity/iLotteryResult';
import { LotteryResultFactory } from '../entity/lotteryResultFactory';

export async function fromModelToEntity(lotteryModel: LotteryModel): Promise<ILotteryResult> {
    const lotteryResults = await lotteryModel.getResults().then((r) =>
        r.map((result) => {
            return {
                position: result.position,
                result: result.result,
            };
        })
    );

    const lottery = {
        id: lotteryModel.id,
        name: lotteryModel.lotteryNameId,
        type: lotteryModel.lotteryTypeId,
        date: lotteryModel.date,
        results: lotteryResults,
    };

    return LotteryResultFactory.createLotteryResult(lottery);
}

export function fromEntityToModel(lotteryEntity: ILotteryResult): ILotteryModelCreationAttributes {
    return {
        date: new Date(lotteryEntity.date),
        lotteryNameId: ELotteryNames[lotteryEntity.name],
        lotteryTypeId: ELotteryTypes[lotteryEntity.type],
    };
}

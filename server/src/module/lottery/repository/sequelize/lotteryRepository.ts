import { DatabaseError, Op } from 'sequelize';

import { ILotteryRepository } from '../iLotteryRepository';
import { fromModelToEntity } from '../../mapper/lotteryMapper';
import { ResourceNotFoundError } from '../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../error/genericDatabaseError';
import { ILotteryModelCreationAttributes, LotteryModel } from '../../model/lottery';
import { ILotteryResult } from '../../entity/iLotteryResult';
import { IResultModelCreationAttributes } from '../../model/result';

export class LotteryRepository implements ILotteryRepository {
    lotteryModel: typeof LotteryModel;

    constructor(lotteryModel: typeof LotteryModel) {
        this.lotteryModel = lotteryModel;
    }

    async getByDate(date: Date): Promise<ILotteryResult[]> {
        let lotteries: LotteryModel[] | undefined;
        try {
            const dateStart = new Date(date).setHours(0, 0, 0, 0);
            const dateEnd = new Date(date).setHours(23, 59, 59, 999);

            lotteries = await this.lotteryModel.findAll({
                where: {
                    date: {
                        [Op.between]: [dateStart, dateEnd],
                    },
                },
            });
        } catch (e) {
            if (e instanceof DatabaseError) {
                console.log('DATABASE ERROR:', e.message);
                console.log('SQL:', e.sql);
                console.log('QUERY PARAMETERS:', e.parameters);
            } else {
                throw e;
            }
        }

        if (lotteries) {
            return await Promise.all(lotteries.map(fromModelToEntity));
        } else {
            throw new ResourceNotFoundError();
        }
    }

    async addRegistry(
        attributes: ILotteryModelCreationAttributes,
        results: IResultModelCreationAttributes[]
    ): Promise<ILotteryResult> {
        let newLottery: LotteryModel;
        try {
            newLottery = await this.lotteryModel.create(attributes);
            if (newLottery) {
                await Promise.all(
                    results.map((r) => {
                        const { position, result } = r;
                        return newLottery.createResult({position, result})
                    })
                );
            }
        } catch (e) {
            if (e instanceof DatabaseError) {
                console.log('DATABASE ERROR:', e.message);
                console.log('SQL:', e.sql);
                console.log('QUERY PARAMETERS:', e.parameters);
                throw new GenericDatabaseError();
            } else {
                console.log(e);
                throw new GenericDatabaseError();
            }
        }

        if (newLottery) {
            return await fromModelToEntity(newLottery);
        } else {
            throw new GenericDatabaseError();
        }
    }
}

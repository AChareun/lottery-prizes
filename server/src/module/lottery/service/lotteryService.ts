import { ILotteryRepository } from '../repository/iLotteryRepository';
import { fromEntityToModel } from '../mapper/lotteryMapper';
import { fromEntityToModel as fromResultEntityToModel } from '../mapper/resultMapper';
import { ILotteryResult } from '../entity/iLotteryResult';

export class LotteryService {
    lotteryRepository: ILotteryRepository;

    constructor(lotteryRepository: ILotteryRepository) {
        this.lotteryRepository = lotteryRepository;
    }

    async getByDate(date: Date): Promise<ILotteryResult[]> {
        return await this.lotteryRepository.getByDate(date);
    }

    async addLottery(lottery: ILotteryResult): Promise<ILotteryResult> {
        const lotteryAttributes = fromEntityToModel(lottery);
        const lotteryResults = lottery.results.map(fromResultEntityToModel);

        return await this.lotteryRepository.addRegistry(lotteryAttributes, lotteryResults);
    }
}

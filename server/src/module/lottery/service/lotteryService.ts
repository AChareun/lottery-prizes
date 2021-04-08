import { ILotteryRepository } from '../repository/lotteryRepositoryInterface';
import { Result } from '../entity/result';
import { fromEntityToModel } from '../mapper/lotteryMapper';

export class LotteryService {
    lotteryRepository: ILotteryRepository;

    constructor(lotteryRepository: ILotteryRepository) {
        this.lotteryRepository = lotteryRepository;
    }

    async getByDate(date: string): Promise<Result[]> {
        const today = new Date(date);

        return await this.lotteryRepository.getByDate(today);
    }

    async addResult(result: Result): Promise<Result> {
        return await this.lotteryRepository.addRegistry(fromEntityToModel(result));
    }
}

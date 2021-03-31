import { IResultRepository } from '../repository/resultRepositoryInterface';
import { Result } from '../entity/result';
import { fromEntityToModel } from '../mapper/resultMapper';

export class ResultService {
    resultRepository: IResultRepository;

    constructor(resultRepository: IResultRepository) {
        this.resultRepository = resultRepository;
    }

    async getByDate(date: string): Promise<Result[]> {
        const today = new Date(date);

        return await this.resultRepository.getByDate(today);
    }

    async addResult(result: Result): Promise<Result> {
        return await this.resultRepository.addRegistry(fromEntityToModel(result));
    }
}
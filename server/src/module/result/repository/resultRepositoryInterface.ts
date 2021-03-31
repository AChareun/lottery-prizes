import { Result } from '../entity/result';
import { IResultCreationAttributes } from '../model/result';

export interface IResultRepository {
    getByDate(date: Date): Promise<Result[]>;

    addRegistry(attributes: IResultCreationAttributes): Promise<Result>;
}

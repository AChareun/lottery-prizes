import { Result } from '../entity/result';
import { IResultCreationAttributes } from '../model/result';

export interface IResultRepository {
    getByDate(date: string): Promise<Result[]>;

    addRegistry(attributes: IResultCreationAttributes): Promise<Result>;
}

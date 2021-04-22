export interface IDataSource {
    getData: <T>(date: string, type: string, turn?: string) => Promise<T[]>;
}

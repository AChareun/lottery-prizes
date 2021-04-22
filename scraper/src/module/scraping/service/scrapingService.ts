import { DataSourceFactory } from '../dataSource/dataSourceFactory';

export class ScrapingService {
    dataSourceFactory: DataSourceFactory;

    constructor(dataSourceFactory: DataSourceFactory) {
        this.dataSourceFactory = dataSourceFactory;
    }

    async getLotteryData(date: string, turn?: string): Promise<any> {
        const dataSource = this.dataSourceFactory.getDataSource();

        return await dataSource.getData(date, 'LOTTERY', turn);
    }

    async getQuiniData(date: string): Promise<any> {
        const dataSource = this.dataSourceFactory.getDataSource();

        return await dataSource.getData(date, 'QUINI');
    }
}

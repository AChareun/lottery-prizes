import { IDataSource } from './dataSource';
import { SanDiegoDataSource } from './sandiego';
import { HttpAdapter } from '../../../lib/httpAdapter';

export class DataSourceFactory {
    httpAdapter: HttpAdapter;

    constructor(httpAdapter: HttpAdapter) {
        this.httpAdapter = httpAdapter;
    }

    getDataSource(): IDataSource {
        return new SanDiegoDataSource(this.httpAdapter);
    }
}

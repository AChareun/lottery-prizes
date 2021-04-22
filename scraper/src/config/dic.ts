import DIContainer, { get, object } from 'rsdi';

import { HttpAdapter } from '../lib/httpAdapter';
import { ScrapingService, ScrapingController, DataSourceFactory } from '../module/scraping/module';

function addScrapingModuleDefinitions(container: DIContainer): void {
    container.addDefinitions({
        HttpAdapter: object(HttpAdapter).construct(),
        DataSourceFactory: object(DataSourceFactory).construct(get('HttpAdapter')),
        ScrapingService: object(ScrapingService).construct(get('DataSourceFactory')),
        ScrapingController: object(ScrapingController).construct(get('ScrapingService')),
    });
}

export function getConfigureDIC(): DIContainer {
    const container = new DIContainer();

    addScrapingModuleDefinitions(container);

    return container;
}

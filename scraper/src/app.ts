require('dotenv').config();

import { getConfigureDIC } from './config/dic';
import { ScrapingController } from './module/scraping/controller/scrapingController';

const main = () =>
    new Promise<string>(async (res, rej) => {
        const [requiredDate, requiredType, requiredTurn] = [process.argv[2], process.argv[3], process.argv[4]];

        const scrapingController = getConfigureDIC().get<ScrapingController>('ScrapingController');

        try {
            const requiredData = await scrapingController.requestData(requiredDate, requiredType, requiredTurn);
            res(JSON.stringify(requiredData));
        } catch (error) {
            rej(error);
        }
    });

main()
    .then((r: string) => console.log(r))
    .catch((err: Error) => console.error(err));

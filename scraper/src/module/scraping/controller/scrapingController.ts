import { ScrapingService } from '../service/scrapingService';
import { isValidDate } from '../../../lib/dateHelpers';

enum RequiredDataTypes {
    LOTTERY = 'LOTTERY',
    QUINI = 'QUINI',
}

export class ScrapingController {
    scrapingService: ScrapingService;

    constructor(scrapingService: ScrapingService) {
        this.scrapingService = scrapingService;
    }

    async requestData(date: string, type: string, turn: string): Promise<object> {
        if (date === 'LATEST' || isValidDate(new Date(date))) {
            let requiredData;
            switch (type) {
                case RequiredDataTypes.LOTTERY:
                    requiredData = await this.scrapingService.getLotteryData(date, turn);
                    break;
                case RequiredDataTypes.QUINI:
                    requiredData = await this.scrapingService.getQuiniData(date);
                    break;
                default:
                    throw new Error('Invalid Data Type Requested');
            }

            return requiredData;
        } else {
            throw new Error('Invalid Date');
        }
    }
}

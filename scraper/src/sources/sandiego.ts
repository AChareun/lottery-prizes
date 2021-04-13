import * as cheerio from 'cheerio';
import got from 'got';
import * as dayjs from "dayjs";

import CONSTANTS from '../core/appConstants';

export class SanDiegoSource {
    baseUrl = "http://www.quinielasandiego.com.ar/";
    lotteryLatest = "?c=quiniela";
    quiniLatest = "?c=quini_6";

    httpAdapter: any;

    constructor(httpAdapter: any) {
        this.httpAdapter = httpAdapter;
    }

    async getData(date: string, type: string, turn?: string): Promise<any> {
        if (type === 'LOTTERY') {
            return await this.getLotteries(date, turn);
        }

        if (type === 'QUINI') {
            return await this.getQuini(date, turn);
        }

        throw new Error("WRONG TYPE PARAMETER");
    }

    async getLotteries(date: string, turn?: string): Promise<any> {
        let $: cheerio.Root;
        if (date === 'LATEST') {
            const url = this.baseUrl + this.lotteryLatest;
            $ = await got.get(url).then(r => cheerio.load(r.body));
        } else {
            const urlDate = `&fecha=${this.formatDate(date)}`;
            const urlTurn = `&turno=${turn}`;

            const url = this.baseUrl + this.lotteryLatest + urlDate + urlTurn;
            $ = await got.get(url).then(r => cheerio.load(r.body));
        }

        const lotteries = $("#quiniela").toArray();
        return lotteries.map(lottery => {
            const result: any = {};

            result.title = $('strong', lottery).text();

            result.numbers = $(".numero", lottery).map((i, e) => {
                return {
                    order: i + 1,
                    number: $(e).attr('value'),
                }
            }).toArray();

            return result;
        });
    }

    async getQuini(date: string, turn?: string): Promise<any> {

    }

    formatDate(date: string): string {
        const dayOfWeek = CONSTANTS.DAYS_ES[dayjs(date).day()];
        const dateWithFormat = dayjs(date).format("DD/MM/YY");

        return dayOfWeek + "%20" + dateWithFormat;
    }
}

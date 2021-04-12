import { ELotteryNames, ELotteryTypes, ILotteryResult, IResult } from './iLotteryResult';

export class UyLotteryResult implements ILotteryResult {
    id: number | null;
    name: keyof typeof ELotteryNames;
    results: IResult[];
    type: keyof typeof ELotteryTypes;
    date: Date;

    constructor(
        name: keyof typeof ELotteryNames,
        type: keyof typeof ELotteryTypes,
        results: any,
        date: Date,
        id: number | null = null
    ) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.type = type;
        this.results = this.formatResults(results);
    }

    formatResults(results: { order: number; result: number }[]): IResult[] {
        return results.map(({ order, result }) => {
            const strResult =
                result === null || typeof result === 'undefined'
                    ? null
                    : String(result).padStart(3, '0');

            return {
                position: order,
                result: strResult,
            };
        });
    }
}

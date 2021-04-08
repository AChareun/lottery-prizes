import { ELotteryNames, ELotteryTypes, ILotteryResult, TResult } from './iLotteryResult';

export class ArgLotteryResult implements ILotteryResult {
    id: number | null;
    name: keyof typeof ELotteryNames;
    results: TResult[];
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

    formatResults(results: { order: number; result: number }[]): TResult[] {
        return results.map(({ order, result }) => {
            const strResult =
                result === null || typeof result === 'undefined'
                    ? null
                    : String(result).padStart(4, '0');

            return {
                position: order,
                result: strResult,
            };
        });
    }
}

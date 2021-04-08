import { ELotteryNames, ELotteryTypes, ILotteryResult } from './iLotteryResult';
import { UyLotteryResult } from './uyLotteryResult';
import { ArgLotteryResult } from './argLotteryResult';

export class LotteryResultFactory {
    static createLotteryResult(lotteryOptions: any): ILotteryResult {
        const { type, results, date, id } = lotteryOptions;
        const lottery: ELotteryNames = lotteryOptions.name;

        const lotteryName = ELotteryNames[lottery];
        const lotteryType = ELotteryTypes[type];

        switch (lottery) {
            case ELotteryNames.ORO:
                // @ts-ignore --> I think lotteryName should be a union type with enum names but somehow is just string
                return new UyLotteryResult(lotteryName, lotteryType, results, date, id);

            case ELotteryNames.CIUDAD:
            case ELotteryNames['BUENOS AIRES']:
            case ELotteryNames.CORDOBA:
            case ELotteryNames['ENTRE RIOS']:
            case ELotteryNames['SANTA FE']:
                // @ts-ignore --> I think lotteryName should be a union type with enum names but somehow is just string
                return new ArgLotteryResult(lotteryName, lotteryType, results, date, id);

            default:
                throw new Error('Invalid Lottery Name');
        }
    }
}

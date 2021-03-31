import {IResultAttributes, IResultCreationAttributes} from '../model/result';
import { IResultConstructorParam, Result } from '../entity/result';

function fromIntToString(num: number | undefined | null): string | null {
    if (num === undefined || num === null) {
        return null
    }

    let stringNumber = num.toString();
    while (stringNumber.length < 4) {
        stringNumber = '0' + stringNumber;
    }

    return stringNumber;
}

export function fromModelToEntity(resultModel: IResultAttributes): Result {
    const resultProps: IResultConstructorParam = {
        id: resultModel.id,
        pos01: fromIntToString(resultModel?.pos01),
        pos02: fromIntToString(resultModel?.pos02),
        pos03: fromIntToString(resultModel?.pos03),
        pos04: fromIntToString(resultModel?.pos04),
        pos05: fromIntToString(resultModel?.pos05),
        pos06: fromIntToString(resultModel?.pos06),
        pos07: fromIntToString(resultModel?.pos07),
        pos08: fromIntToString(resultModel?.pos08),
        pos09: fromIntToString(resultModel?.pos09),
        pos10: fromIntToString(resultModel?.pos10),
        pos11: fromIntToString(resultModel?.pos11),
        pos12: fromIntToString(resultModel?.pos12),
        pos13: fromIntToString(resultModel?.pos13),
        pos14: fromIntToString(resultModel?.pos14),
        pos15: fromIntToString(resultModel?.pos15),
        pos16: fromIntToString(resultModel?.pos16),
        pos17: fromIntToString(resultModel?.pos17),
        pos18: fromIntToString(resultModel?.pos18),
        pos19: fromIntToString(resultModel?.pos19),
        pos20: fromIntToString(resultModel?.pos20),
    };

    return new Result(resultProps);
}

export function fromEntityToModel(result: Result): IResultCreationAttributes {
    const resultAttributes: IResultCreationAttributes = {
        ...result,
        pos01: result?.pos01 !== null  ? Number(result.pos01) : null,
        pos02: result?.pos02 !== null  ? Number(result.pos02) : null,
        pos03: result?.pos03 !== null  ? Number(result.pos03) : null,
        pos04: result?.pos04 !== null  ? Number(result.pos04) : null,
        pos05: result?.pos05 !== null  ? Number(result.pos05) : null,
        pos06: result?.pos06 !== null  ? Number(result.pos06) : null,
        pos07: result?.pos07 !== null  ? Number(result.pos07) : null,
        pos08: result?.pos08 !== null  ? Number(result.pos08) : null,
        pos09: result?.pos09 !== null  ? Number(result.pos09) : null,
        pos10: result?.pos10 !== null  ? Number(result.pos10) : null,
        pos11: result?.pos11 !== null  ? Number(result.pos11) : null,
        pos12: result?.pos12 !== null  ? Number(result.pos12) : null,
        pos13: result?.pos13 !== null  ? Number(result.pos13) : null,
        pos14: result?.pos14 !== null  ? Number(result.pos14) : null,
        pos15: result?.pos15 !== null  ? Number(result.pos15) : null,
        pos16: result?.pos16 !== null  ? Number(result.pos16) : null,
        pos17: result?.pos17 !== null  ? Number(result.pos17) : null,
        pos18: result?.pos18 !== null  ? Number(result.pos18) : null,
        pos19: result?.pos19 !== null  ? Number(result.pos19) : null,
        pos20: result?.pos20 !== null  ? Number(result.pos20) : null,
    }

    return resultAttributes
}

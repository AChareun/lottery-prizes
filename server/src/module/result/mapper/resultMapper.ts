import {IResultAttributes, IResultCreationAttributes} from '../model/result';
import { IResultConstructorParam, Result } from '../entity/result';

function fromIntToString(num: number): string {
    let stringNumber = num.toString();
    while (stringNumber.length < 4) {
        stringNumber = '0' + stringNumber;
    }

    return stringNumber;
}

export function fromModelToEntity(resultModel: IResultAttributes): Result {
    const resultProps: IResultConstructorParam = {
        id: resultModel.id,
        pos01: resultModel.pos01 ? fromIntToString(resultModel.pos01) : null,
        pos02: resultModel.pos02 ? fromIntToString(resultModel.pos02) : null,
        pos03: resultModel.pos03 ? fromIntToString(resultModel.pos03) : null,
        pos04: resultModel.pos04 ? fromIntToString(resultModel.pos04) : null,
        pos05: resultModel.pos05 ? fromIntToString(resultModel.pos05) : null,
        pos06: resultModel.pos06 ? fromIntToString(resultModel.pos06) : null,
        pos07: resultModel.pos07 ? fromIntToString(resultModel.pos07) : null,
        pos08: resultModel.pos08 ? fromIntToString(resultModel.pos08) : null,
        pos09: resultModel.pos09 ? fromIntToString(resultModel.pos09) : null,
        pos10: resultModel.pos10 ? fromIntToString(resultModel.pos10) : null,
        pos11: resultModel.pos11 ? fromIntToString(resultModel.pos11) : null,
        pos12: resultModel.pos12 ? fromIntToString(resultModel.pos12) : null,
        pos13: resultModel.pos13 ? fromIntToString(resultModel.pos13) : null,
        pos14: resultModel.pos14 ? fromIntToString(resultModel.pos14) : null,
        pos15: resultModel.pos15 ? fromIntToString(resultModel.pos15) : null,
        pos16: resultModel.pos16 ? fromIntToString(resultModel.pos16) : null,
        pos17: resultModel.pos17 ? fromIntToString(resultModel.pos17) : null,
        pos18: resultModel.pos18 ? fromIntToString(resultModel.pos18) : null,
        pos19: resultModel.pos19 ? fromIntToString(resultModel.pos19) : null,
        pos20: resultModel.pos20 ? fromIntToString(resultModel.pos20) : null,
    };

    return new Result(resultProps);
}

export function fromEntityToModel(result: Result): IResultCreationAttributes {
    const resultAttributes: IResultCreationAttributes = {
        ...result,
        pos01: result.pos01 ? Number(result.pos01) : null,
        pos02: result.pos02 ? Number(result.pos02) : null,
        pos03: result.pos03 ? Number(result.pos03) : null,
        pos04: result.pos04 ? Number(result.pos04) : null,
        pos05: result.pos05 ? Number(result.pos05) : null,
        pos06: result.pos06 ? Number(result.pos06) : null,
        pos07: result.pos07 ? Number(result.pos07) : null,
        pos08: result.pos08 ? Number(result.pos08) : null,
        pos09: result.pos09 ? Number(result.pos09) : null,
        pos10: result.pos10 ? Number(result.pos10) : null,
        pos11: result.pos11 ? Number(result.pos11) : null,
        pos12: result.pos12 ? Number(result.pos12) : null,
        pos13: result.pos13 ? Number(result.pos13) : null,
        pos14: result.pos14 ? Number(result.pos14) : null,
        pos15: result.pos15 ? Number(result.pos15) : null,
        pos16: result.pos16 ? Number(result.pos16) : null,
        pos17: result.pos17 ? Number(result.pos17) : null,
        pos18: result.pos18 ? Number(result.pos18) : null,
        pos19: result.pos19 ? Number(result.pos19) : null,
        pos20: result.pos20 ? Number(result.pos20) : null,
    }

    return resultAttributes
}

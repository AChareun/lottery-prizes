export interface ILotteryResult {
    id: number | null;
    name: keyof typeof ELotteryNames;
    type: keyof typeof ELotteryTypes;
    results: IResult[];
    date: Date;
    formatResults(results: any): IResult[];
}

export interface IResult {
    position: number;
    result: string | null;
}

export enum ELotteryNames {
    'CIUDAD' = 0,
    'BUENOS AIRES' = 1,
    'SANTA FE' = 2,
    'ORO' = 3,
    'ENTRE RIOS' = 4,
    'CORDOBA' = 5,
}

export enum ELotteryTypes {
    'PRIMERA' = 0,
    'MATUTINA' = 1,
    'VESPERTINA' = 2,
    'NOCTURNA' = 3,
}

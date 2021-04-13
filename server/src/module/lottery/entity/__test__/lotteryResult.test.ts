import { LotteryResultFactory } from '../lotteryResultFactory';
import { UyLotteryResult } from '../uyLotteryResult';
import { ArgLotteryResult } from '../argLotteryResult';

let mockLotteryResult = {
    id: 0,
    date: new Date(),
    type: 1,
    results: [{ position: 1, result: 12 }],
    name: 1,
};

beforeEach(() => {
    mockLotteryResult = {
        id: 0,
        date: new Date(),
        type: 1,
        results: [{ position: 1, result: 12 }],
        name: 1,
    };
});

test('lotteryResultFactory instantiates the right classes', () => {
    expect(LotteryResultFactory.createLotteryResult(mockLotteryResult)).toBeInstanceOf(
        ArgLotteryResult
    );

    mockLotteryResult.name = 3;
    expect(LotteryResultFactory.createLotteryResult(mockLotteryResult)).toBeInstanceOf(
        UyLotteryResult
    );
});

test('invalid lottery name makes factory to throw error', () => {
    mockLotteryResult.name = 322;
    let failedLottery;
    try {
        failedLottery = LotteryResultFactory.createLotteryResult(mockLotteryResult);
    } catch (e) {
        expect(e.message).toEqual('Invalid Lottery Name');
    } finally {
        expect(failedLottery).toBeUndefined();
    }
});

test('lottery method format results correctly', () => {
    const testArgLottery = LotteryResultFactory.createLotteryResult(mockLotteryResult);
    expect(testArgLottery.results[0].result).toEqual('0012');

    mockLotteryResult.name = 3;
    const testUyLottery = LotteryResultFactory.createLotteryResult(mockLotteryResult);
    expect(testUyLottery.results[0].result).toEqual('012');
});

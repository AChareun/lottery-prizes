import { LotteryService } from '../../service/lotteryService';
import { LotteryController } from '../lotteryController';
import { ApiResponseHelper } from '../../../../lib/apiResponse';

const resMock = (() => {
    const res = {
        status: function () {},
        json: function () {},
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
})();

const serviceMock: LotteryService = {
    lotteryRepository: {
        getByDate: jest.fn(),
        addRegistry: jest.fn(),
    },
    addLottery: jest.fn(),
    getByDate: jest.fn(),
};

const responseHelperMock: ApiResponseHelper = {
    apiErrors: {},
    buildErrorResponse: jest.fn(),
    buildOkResponse: jest.fn(),
};

const testController = new LotteryController(serviceMock, responseHelperMock);

beforeEach((): void => {
    jest.clearAllMocks();
});

test('controller methods call the right service methods', () => {
    const today = new Date();
    // @ts-ignore
    testController.getLotteryResults({ query: { date: today.toString() } }, resMock);

    expect(serviceMock.getByDate).toHaveBeenCalledTimes(1);
    // @ts-ignore --> getByDate is a mocked fn but TS does not recognize it as that
    expect(serviceMock.getByDate.mock.calls[0][0].getDate()).toEqual(today.getDate());

    const resultsMock = {};
    // @ts-ignore
    testController.postLotteryResults({ body: { results: resultsMock } }, {});

    expect(serviceMock.addLottery).toHaveBeenCalledTimes(1);
    expect(serviceMock.addLottery).toHaveBeenCalledWith(resultsMock);
});

test("getResults calls service method with today date when query param equals 'today'", () => {
    const todayDate = new Date().getDate();
    // @ts-ignore
    testController.getLotteryResults({ query: { date: 'today' } }, resMock);

    expect(serviceMock.getByDate).toHaveBeenCalledTimes(1);
    // @ts-ignore --> getByDate is a mocked fn but TS does not recognize it as that
    expect(serviceMock.getByDate.mock.calls[0][0].getDate()).toEqual(todayDate);
});

test("responseHelper is called with specific error when query param is wrong", async () => {
    // @ts-ignore
    await testController.getLotteryResults({ query: { date: 'wrong' } }, resMock);

    expect(responseHelperMock.buildErrorResponse).toHaveBeenCalledTimes(1);
    expect(responseHelperMock.buildErrorResponse).toHaveBeenCalledWith("WRONG_QUERY_PARAM");
});

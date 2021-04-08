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
    addResult: jest.fn(),
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
    const nowString = new Date().toString();
    // @ts-ignore
    testController.getResults({ query: { date: nowString } }, resMock);

    expect(serviceMock.getByDate).toHaveBeenCalledTimes(1);
    expect(serviceMock.getByDate).toHaveBeenCalledWith(nowString);

    const resultsMock = {};
    // @ts-ignore
    testController.postResults({ body: { results: resultsMock } }, {});

    expect(serviceMock.addResult).toHaveBeenCalledTimes(1);
    expect(serviceMock.addResult).toHaveBeenCalledWith(resultsMock);
});

test("getResults calls service method with today date when query param equals 'today'", () => {
    const today = new Date();
    // @ts-ignore
    testController.getResults({ query: { date: 'today' } }, resMock);

    expect(serviceMock.getByDate).toHaveBeenCalledTimes(1);
    expect(serviceMock.getByDate).toHaveBeenCalledWith(new Date(today).toString());
});

test("responseHelper is called with specific error when query param is wrong", async () => {
    // @ts-ignore
    await testController.getResults({ query: { date: 'wrong' } }, resMock);

    expect(responseHelperMock.buildErrorResponse).toHaveBeenCalledTimes(1);
    expect(responseHelperMock.buildErrorResponse).toHaveBeenCalledWith("WRONG_QUERY_PARAM");
});
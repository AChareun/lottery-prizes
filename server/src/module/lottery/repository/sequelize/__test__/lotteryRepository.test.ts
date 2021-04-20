/**
 * TEST SETUP
 */
import { Sequelize } from 'sequelize';
import { LotteryRepository } from '../lotteryRepository';
import { ResultModel, LotteryModel, LotteryNameModel, LotteryTypeModel } from '../../../model';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../../error/genericDatabaseError';
import { ArgLotteryResult } from '../../../entity/argLotteryResult';

const testSequelizeInstance = new Sequelize('sqlite::memory');

let testRepo: LotteryRepository;
let lotteryModel: typeof LotteryModel;
let resultModel: typeof ResultModel;
let lotteryNameModel: typeof LotteryNameModel;
let lotteryTypeModel: typeof LotteryTypeModel;

beforeAll(
    async (): Promise<void> => {
        lotteryTypeModel = await LotteryTypeModel.setup(testSequelizeInstance);
        lotteryNameModel = await LotteryNameModel.setup(testSequelizeInstance);
        lotteryModel = await LotteryModel.setup(testSequelizeInstance);
        resultModel = await ResultModel.setup(testSequelizeInstance);

        lotteryModel.setupAssociations(lotteryNameModel, lotteryTypeModel);
        resultModel.setupAssociations(lotteryModel);

        testRepo = new LotteryRepository(lotteryModel);
    }
);

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
        await lotteryTypeModel.create({ id: 0, type: 'CIUDAD' });
        await lotteryNameModel.create({ id: 0, name: 'PRIMERA' });
        done();
    }
);

/**
 * TESTS
 */

test('Trying to get a non-existing registry throws a specific error', async () => {
    const now = new Date();
    try {
        await testRepo.getByDate(now);
    } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundError);
    }
});

test('addRegistry method adds a new lottery with auto-id and associates results', async () => {
    const fakeLotteryData = { lotteryNameId: 0, lotteryTypeId: 0, date: new Date() };
    const fakeResultData = [{ lotteryId: 10, position: 1, result: 12 }];
    const newLottery = await testRepo.addRegistry(fakeLotteryData, fakeResultData);

    expect(newLottery.id).toEqual(1);
    expect(newLottery).toBeInstanceOf(ArgLotteryResult);
    expect(newLottery.results[0]).toEqual({position: 1, result: '0012'});
});

test('Failing to add a registry throws a specific error', async () => {
    const wrongData = null;
    try {
        // @ts-ignore --> This is just to test the error throw so it's expected
        await testRepo.addRegistry(wrongData, wrongData);
    } catch (e) {
        expect(e).toBeInstanceOf(GenericDatabaseError);
    }
});

test('A registry can be obtained by using getByDate method', async () => {
    const today = new Date();
    const fakeLotteryData = { lotteryNameId: 0, lotteryTypeId: 0, date: today };
    const fakeResultData = [{ lotteryId: 10, position: 1, result: 12 }];

    await testRepo.addRegistry(fakeLotteryData, fakeResultData);
    const retrievedResult = await testRepo.getByDate(today);

    expect(retrievedResult[0].id).toEqual(1);
});

/**
 * TEST SETUP
 */
import { Sequelize } from 'sequelize';
import { LotteryRepository } from '../lotteryRepository';
import { ResultModel } from '../../../model/result';
import { ResourceNotFoundError } from '../../../../error/resourceNotFoundError';
import { GenericDatabaseError } from '../../../../error/genericDatabaseError';

const testSequelizeInstance = new Sequelize('sqlite::memory');

let testRepo: LotteryRepository;
let resultModel: typeof ResultModel;

beforeAll(
    async (): Promise<void> => {
        resultModel = await ResultModel.setup(testSequelizeInstance);
        testRepo = new LotteryRepository(resultModel);
    }
);

beforeEach(
    async (done): Promise<void> => {
        await testSequelizeInstance.sync({ force: true });
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

test('addRegistry method adds a new lottery and auto-increments id', async () => {
    const fakeResultData = {};
    const newResult = await testRepo.addRegistry(fakeResultData);

    expect(newResult.id).toEqual(1);
});

test('Failing to add a registry throws a specific error', async () => {
    const wrongData = null;
    try {
        // @ts-ignore
        await testRepo.addRegistry(wrongData);
    } catch (e) {
        expect(e).toBeInstanceOf(GenericDatabaseError);
    }
});

test('A registry can be obtained by using getByDate method', async () => {
    const today = new Date(new Date().toString());
    const fakeResultData = {};

    await testRepo.addRegistry(fakeResultData);
    const retrievedResult = await testRepo.getByDate(new Date(today));

    expect(retrievedResult[0].id).toEqual(1);
});

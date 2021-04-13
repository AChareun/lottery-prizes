import { LotteryService } from '../lotteryService';
import { ILotteryRepository } from '../../repository/iLotteryRepository';
import { fromEntityToModel } from '../../mapper/lotteryMapper';
import { ILotteryResult } from '../../entity/iLotteryResult';

const mockRepo: ILotteryRepository = {
    addRegistry: jest.fn(),
    getByDate: jest.fn(),
}
const testService: LotteryService = new LotteryService(mockRepo);

test('Service correctly calls repository methods with the right arguments', async () => {
    const stringDate = new Date().toString();
    await testService.getByDate(stringDate);

    expect(mockRepo.getByDate).toHaveBeenCalledTimes(1);
    expect(mockRepo.getByDate).toHaveBeenCalledWith(new Date(stringDate));

    const lotteryMock: ILotteryResult = {
        date: new Date(),
        id: null,
        name: "CIUDAD",
        results: [],
        type: "PRIMERA",
        formatResults: jest.fn(),
    }
    await testService.addLottery(lotteryMock);

    expect(mockRepo.addRegistry).toHaveBeenCalledTimes(1);
    expect(mockRepo.addRegistry).toHaveBeenCalledWith(fromEntityToModel(lotteryMock), []);
});


import { ResultService } from '../resultService';
import { IResultRepository } from '../../repository/resultRepositoryInterface';
import { Result } from '../../entity/result';
import { fromEntityToModel } from '../../mapper/resultMapper';

const mockRepo: IResultRepository = {
    addRegistry: jest.fn(),
    getByDate: jest.fn(),
}
const testService: ResultService = new ResultService(mockRepo);

test('Service correctly calls repository methods with the right arguments', async () => {
    const stringDate = new Date().toString();
    await testService.getByDate(stringDate);

    expect(mockRepo.getByDate).toHaveBeenCalledTimes(1);
    expect(mockRepo.getByDate).toHaveBeenCalledWith(new Date(stringDate));

    const entityMock: Result = {
        id: 1,
        pos01: '0000',
        pos02: '0001',
        pos03: '0012',
        pos04: '0123',
        pos05: '1234',
        pos06: null,
        pos07: '1234',
        pos08: '1234',
        pos09: '1234',
        pos10: '1234',
        pos11: '1234',
        pos12: '1234',
        pos13: '1234',
        pos14: '1234',
        pos15: '1234',
        pos16: '1234',
        pos17: '1234',
        pos18: '1234',
        pos19: '1234',
        pos20: '1234',
    };
    await testService.addResult(entityMock);

    expect(mockRepo.addRegistry).toHaveBeenCalledTimes(1);
    expect(mockRepo.addRegistry).toHaveBeenCalledWith(fromEntityToModel(entityMock));
});


import { fromEntityToModel, fromModelToEntity } from '../resultMapper';
import { IResultAttributes } from '../../model/result';
import { Result } from '../../entity/result';

test('model to entity effectively maps pos* props from int to string', () => {
    const now = new Date();
    const modelMock: IResultAttributes = {
        id: 1,
        pos01: 0,
        pos02: 12,
        pos03: 123,
        pos04: 1234,
        pos05: null,
        pos06: 12,
        pos07: 12,
        pos08: 12,
        pos09: 12,
        pos10: 12,
        pos11: 12,
        pos12: 12,
        pos13: 12,
        pos14: 12,
        pos15: 12,
        pos16: 12,
        pos17: 12,
        pos18: 12,
        pos19: 12,
        pos20: 12,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
    };

    const entity = fromModelToEntity(modelMock);
    expect(entity.pos01).toEqual('0000');
    expect(entity.pos02).toEqual('0012');
    expect(entity.pos03).toEqual('0123');
    expect(entity.pos04).toEqual('1234');
    expect(entity.pos05).toEqual(null);
});

test('entity to model effectively maps pos* props from str to int', () => {
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

    const model = fromEntityToModel(entityMock);
    expect(model.pos01).toEqual(0);
    expect(model.pos02).toEqual(1);
    expect(model.pos03).toEqual(12);
    expect(model.pos04).toEqual(123);
    expect(model.pos05).toEqual(1234);
    expect(model.pos06).toEqual(null);
});

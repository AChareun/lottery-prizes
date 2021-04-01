import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

export interface IResultAttributes {
    id: number | null;
    pos01: number | null;
    pos02: number | null;
    pos03: number | null;
    pos04: number | null;
    pos05: number | null;
    pos06: number | null;
    pos07: number | null;
    pos08: number | null;
    pos09: number | null;
    pos10: number | null;
    pos11: number | null;
    pos12: number | null;
    pos13: number | null;
    pos14: number | null;
    pos15: number | null;
    pos16: number | null;
    pos17: number | null;
    pos18: number | null;
    pos19: number | null;
    pos20: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IResultCreationAttributes extends Partial<IResultAttributes> {}

export class ResultModel
    extends Model<IResultAttributes, IResultCreationAttributes>
    implements IResultAttributes {
    id!: number | null;
    pos01!: number | null;
    pos02!: number | null;
    pos03!: number | null;
    pos04!: number | null;
    pos05!: number | null;
    pos06!: number | null;
    pos07!: number | null;
    pos08!: number | null;
    pos09!: number | null;
    pos10!: number | null;
    pos11!: number | null;
    pos12!: number | null;
    pos13!: number | null;
    pos14!: number | null;
    pos15!: number | null;
    pos16!: number | null;
    pos17!: number | null;
    pos18!: number | null;
    pos19!: number | null;
    pos20!: number | null;

    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;

    static setup(sequelizeInstance: Sequelize): typeof ResultModel {
        ResultModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                pos01: {
                    type: DataTypes.INTEGER,
                },
                pos02: {
                    type: DataTypes.INTEGER,
                },
                pos03: {
                    type: DataTypes.INTEGER,
                },
                pos04: {
                    type: DataTypes.INTEGER,
                },
                pos05: {
                    type: DataTypes.INTEGER,
                },
                pos06: {
                    type: DataTypes.INTEGER,
                },
                pos07: {
                    type: DataTypes.INTEGER,
                },
                pos08: {
                    type: DataTypes.INTEGER,
                },
                pos09: {
                    type: DataTypes.INTEGER,
                },
                pos10: {
                    type: DataTypes.INTEGER,
                },
                pos11: {
                    type: DataTypes.INTEGER,
                },
                pos12: {
                    type: DataTypes.INTEGER,
                },
                pos13: {
                    type: DataTypes.INTEGER,
                },
                pos14: {
                    type: DataTypes.INTEGER,
                },
                pos15: {
                    type: DataTypes.INTEGER,
                },
                pos16: {
                    type: DataTypes.INTEGER,
                },
                pos17: {
                    type: DataTypes.INTEGER,
                },
                pos18: {
                    type: DataTypes.INTEGER,
                },
                pos19: {
                    type: DataTypes.INTEGER,
                },
                pos20: {
                    type: DataTypes.INTEGER,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Result',
                timestamps: true,
                paranoid: true,
            }
        );

        return ResultModel;
    }
}

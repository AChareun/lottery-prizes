import { Sequelize, Model, DataTypes } from 'sequelize';

interface ILotteryNameModelAttributes {
    id: number;
    name: string;
}

interface ILotteryNameModelCreationAttributes extends ILotteryNameModelAttributes {}

export class LotteryNameModel
    extends Model<ILotteryNameModelAttributes, ILotteryNameModelCreationAttributes>
    implements ILotteryNameModelAttributes {
    id!: number;
    name!: string;

    static setup(sequelizeInstance: Sequelize): typeof LotteryNameModel {
        LotteryNameModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: false,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'LotteryName',
                timestamps: false,
            }
        );

        return LotteryNameModel;
    }
}

interface ILotteryTypeModelAttributes {
    id: number;
    type: string;
}

interface ILotteryTypeModelCreationAttributes extends ILotteryTypeModelAttributes {}

export class LotteryTypeModel extends Model<ILotteryTypeModelAttributes, ILotteryTypeModelCreationAttributes>
    implements ILotteryTypeModelAttributes{
    id!: number;
    type!: string;

    static setup(sequelizeInstance: Sequelize): typeof LotteryTypeModel {
        LotteryTypeModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: false,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'LotteryType',
                timestamps: false,
            }
        );

        return LotteryTypeModel;
    }
}

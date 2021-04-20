import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { LotteryModel } from './lottery';

export interface IResultModelAttributes {
    id: number | null;
    lotteryId: number;
    position: number;
    result: number;
}

export interface IResultModelCreationAttributes extends Optional<IResultModelAttributes, 'id'> {}

export class ResultModel
    extends Model<IResultModelAttributes, IResultModelCreationAttributes>
    implements IResultModelAttributes {
    id!: number | null;
    lotteryId!: number;
    position!: number;
    result!: number;

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
                lotteryId: {
                    type: DataTypes.BIGINT,
                    references: {
                        model: 'Lotteries',
                        key: 'id',
                    },
                    allowNull: false,
                },
                position: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                result: {
                    type: DataTypes.INTEGER,
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

    static setupAssociations(lotteryModel: typeof LotteryModel): typeof ResultModel {
        ResultModel.belongsTo(lotteryModel, { foreignKey: 'lotteryId' });
        lotteryModel.hasMany(ResultModel, { foreignKey: 'lotteryId' });

        return ResultModel;
    }
}

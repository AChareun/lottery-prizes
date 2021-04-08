import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { LotteryNameModel, LotteryTypeModel } from './enum';

interface ILotteryModelAttributes {
    id: number | null;
    lotteryNameId: number;
    lotteryTypeId: number;
    date: Date;
}

interface ILotteryModelCreationAttributes extends Optional<ILotteryModelAttributes, 'id'> {}

export class LotteryModel
    extends Model<ILotteryModelAttributes, ILotteryModelCreationAttributes>
    implements ILotteryModelAttributes {
    id!: number | null;
    date!: Date;
    lotteryNameId!: number;
    lotteryTypeId!: number;

    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date;

    static setup(sequelizeInstance: Sequelize): typeof LotteryModel {
        LotteryModel.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                lotteryNameId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'LotteryNames',
                        key: 'id',
                    },
                    allowNull: false,
                },
                lotteryTypeId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'LotteryTypes',
                        key: 'id',
                    },
                    allowNull: false,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Lottery',
                timestamps: true,
                paranoid: true,
            }
        );

        return LotteryModel;
    }

    static setupAssociations(
        lotteryNameModel: typeof LotteryNameModel,
        lotteryTypeModel: typeof LotteryTypeModel
    ): void {
        LotteryModel.belongsTo(lotteryNameModel, { foreignKey: 'lotteryNameId' });
        lotteryNameModel.hasMany(LotteryModel, { foreignKey: 'lotteryNameId' });

        LotteryModel.belongsTo(lotteryTypeModel, { foreignKey: 'lotteryTypeId' });
        lotteryTypeModel.hasMany(LotteryModel, { foreignKey: 'lotteryTypeId' });
    }
}
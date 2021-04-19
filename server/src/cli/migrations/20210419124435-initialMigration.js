const {
    LotteryModel,
    LotteryNameModel,
    LotteryTypeModel,
    ResultModel,
} = require('../../module/lottery/model/index');

module.exports = {
    up: async (queryInterface, Sequelize) =>
        Promise.all([
            LotteryNameModel.setup(queryInterface.sequelize),
            LotteryTypeModel.setup(queryInterface.sequelize),
            LotteryModel.setup(queryInterface.sequelize),
            ResultModel.setup(queryInterface.sequelize),

            LotteryModel.setupAssociations(LotteryNameModel, LotteryTypeModel),
            ResultModel.setupAssociations(LotteryModel),

            LotteryNameModel.sync(),
            LotteryTypeModel.sync(),
            LotteryModel.sync(),
            ResultModel.sync(),
        ]),

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Results', { cascade: true });
        await queryInterface.dropTable('Lotteries', { cascade: true });
        await queryInterface.dropTable('LotteryTypes', { cascade: true });
        await queryInterface.dropTable('LotteryNames', { cascade: true });
    },
};

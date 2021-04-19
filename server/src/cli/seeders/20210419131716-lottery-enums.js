module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('LotteryNames', [
            {
                id: 0,
                name: 'CIUDAD',
            },
            {
                id: 1,
                name: 'BUENOS AIRES',
            },
            {
                id: 2,
                name: 'SANTA FE',
            },
            {
                id: 3,
                name: 'ORO',
            },
            {
                id: 4,
                name: 'ENTRE ROIS',
            },
            {
                id: 5,
                name: 'CORDOBA',
            },
        ]);

        await queryInterface.bulkInsert('LotteryTypes', [
            {
                id: 0,
                type: 'PRIMERA',
            },
            {
                id: 1,
                type: 'MATUTINA',
            },
            {
                id: 2,
                type: 'VESPERTINA',
            },
            {
                id: 3,
                type: 'NOCTURNA',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('LotteryNames', null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete('LotteryTypes', null, {
            truncate: true,
            cascade: true,
        });
    },
};

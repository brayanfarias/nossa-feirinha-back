const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('NossaFeirinhaDataBase', 'postgres', 'admin', {
    host: 'localhost',
    dialect: "postgres",
});


async function teste() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

teste()
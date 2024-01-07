import { Sequelize } from 'sequelize';

const config = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root', 
    password: '',
    database: 'maderkit_casino',
};

export const sequelizeConexion = new Sequelize(config);

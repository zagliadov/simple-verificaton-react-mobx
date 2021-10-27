import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

export const sequelize = new Sequelize('graphTestDB', 'admin', 'admin', {
    dialect: 'postgres',
    host: 'graphTestDB',
});




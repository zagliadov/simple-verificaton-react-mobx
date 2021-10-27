import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './sequelize/sequelize';
import auth from './routes/auth';
const app = express(),
    SPORT: string = process.env.SPORT || String(8080);
dotenv.config();

app.use(cors());
app.use(express.json());


app.use('/api/auth', auth);


sequelize.sync().then(() => {
    app.listen(SPORT, async (): Promise<void> => {
        console.log(`Server run on: ${SPORT}`)
    })
})
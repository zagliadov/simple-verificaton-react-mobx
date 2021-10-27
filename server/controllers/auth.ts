import express from 'express';
import jwt from 'jsonwebtoken';
import { sequelize } from '../sequelize/sequelize';
import { QueryTypes } from 'sequelize';

interface IRegistrationRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export const registration = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        console.log(req.body)
        const { firstname, lastname, email, password, role }: IRegistrationRequest = req.body;
        await sequelize.query(`
            INSERT INTO users (firstname, lastname, email, password, role)
            VALUES('${firstname}','${lastname}', '${email}', '${password}', '${role}')
        `, { type: QueryTypes.SELECT });
        res.status(200).json('success');

    } catch (error) {
        console.log(error)
    }
}

export const verify = async (
    req: any, // Нужно дополнить request
    res: express.Response,
    next: express.NextFunction) => {

    try {
        console.log(req.headers)
        const authHeader: string | undefined = req.headers['authorization'];
        const token: string = String(authHeader) && String(authHeader).split(' ')[1]
        if (token === null) return res.status(401); // Токена нет

        jwt.verify(token, 'secret', (err, user) => {
            if (err) return res.send(403); // Я вижу токен но токен не валидный
            req.user = user;
        })


        next();
    } catch (error) {
        console.log(error)
    }
}

interface ILoginRequest {
    email: string;
    password: string;
}
interface IUserFromDB {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    role: string;
}
export const login = async (
    req: express.Request,
    res: express.Response): Promise<any> => {
    try {
        const { email, password }: ILoginRequest = req.body;
        if(!email && !password) return res.status(200).send('email or pass undefined')
        const user: IUserFromDB[] = await sequelize.query(`
            SELECT id, firstname, lastname, email, password, role FROM users
            WHERE email = '${email}'
        `, { type: QueryTypes.SELECT });
        if (user.length === 0) return res.status(200).json({ message: 'Email incorrect' });
        if (password !== user[0].password) return res.status(200).json({ message: 'Password incorrect' });

        const token: string = jwt.sign({
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
            role: user[0].role,
        }, 'secret');

        res.status(200).json({ token: token });

    } catch (error) {
        console.log(error)
    }
}
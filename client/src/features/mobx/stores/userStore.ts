import dotenv from 'dotenv';
import { runInAction, makeAutoObservable } from 'mobx';
import axios from 'axios';
import { createHmac } from 'crypto';
dotenv.config();
const PORT = `http://localhost:${process.env.REACT_APP_SHOST}` || '';

//jhsdf
interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role?: string;
}
interface ILogin {
    email: string;
    password: string;
}

interface IVerify {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

export const userStore = makeAutoObservable({
    users: [] as IVerify[],
    token: '' as string,
    message: '' as string,
    /////////////////////////////////////
    /////////////////////////////////////
    setUser: (user: IVerify) => {
        userStore.users = [user]
    },
    setToken: (token: string) => {
        userStore.token = token;
    },
    setMessage: (message: string) => {
        userStore.message = message;
    },
    /////////////////////////////////////
    /////////////////////////////////////
    registration: async (data: IUser) => {
        data.password = await createHmac('sha256', data.password)
            .update('pass').digest('hex');
        data.role = 'user';
        try {
            return await axios.post(`${PORT}/api/auth/registration`, data)
        } catch (error) {
            console.log(error)
        };
    },
    login: async (data: ILogin) => {
        data.password = await createHmac('sha256', data.password)
            .update('pass').digest('hex');
        try {
            return await axios.post<string | any>(`${PORT}/api/auth/login`, data)
                .then(response => response.data)
                .then(data => {
                    runInAction(() => {
                        if (data.token) {
                            userStore.setToken(data.token);
                            localStorage.setItem('token', data.token);
                        };
                        if (data.message) {
                            userStore.setMessage(data.message);
                            localStorage.setItem('message', JSON.stringify(data.message));
                        };
                    });
                });
        } catch (error) {
            console.log(error);
        };
    },
    verify: async (token: string) => {
        try {
            return axios.post<IVerify>(`${PORT}/api/auth/privat`, token, {
                headers: {
                    'Authorization': `bearer ${token}`
                },
            }).then(response => {
                runInAction(() => {
                    userStore.setUser(response.data)
                })
            });
        } catch (error) {
            console.log(error)
        }
    },
});

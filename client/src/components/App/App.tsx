import { FC, useEffect } from 'react';
import Header from '../Header/Header';
import Registration from '../Auth/Registration/Registration';
import Login from '../Auth/Login/Login';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import styled from 'styled-components';
import Privat from '../Privat/Privat';
import {observer} from 'mobx-react-lite';
import { userStore } from '../../features/mobx/stores/userStore';
import Dashboard from '../Dashboard/Dashboard';
import {configure} from 'mobx';
const Wrapper = styled.div`
    height: 100vh;
    box-sizing: border-box;
`;


const App: FC = observer(() => {

    configure({enforceActions: 'observed'})

    useEffect(() => {
        if(localStorage.getItem('message')) localStorage.removeItem('message');
        if(!localStorage.getItem('token')) return 
        userStore.setToken(localStorage.getItem('token') || '');
    }, [])

    return (
        <Wrapper>
            <Header />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/privat' exact>
                    <Privat />
                </Route>
                <Route path="/privat/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Registration />
                </Route>
            </Switch>
        </Wrapper>

    );
});

export default App;
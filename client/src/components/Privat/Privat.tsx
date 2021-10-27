import { FC, useEffect } from 'react';
import { userStore } from '../../features/mobx/stores/userStore';
import { observer } from 'mobx-react-lite';
import {useHistory} from 'react-router-dom';

const Privat: FC = observer(() => {

    const history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token')) history.push('/')
        userStore.verify(String(localStorage.getItem('token')))
    }, [history])



    return (
        <div>
            Privat


        </div>
    );
});

export default Privat;
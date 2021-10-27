import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../features/mobx/stores/userStore';

const Dashboard: FC = observer(() => {

    useEffect(() => {
        if(!localStorage.getItem('token')) return 
        userStore.verify(String(localStorage.getItem('token')))
    }, [])

    return (
        <div>
            Dashboard
        </div>
    );
});

export default Dashboard;
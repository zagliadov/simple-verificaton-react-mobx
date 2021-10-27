import { FC } from 'react';
import {observer} from 'mobx-react-lite';
import {userStore} from '../../features/mobx/stores/userStore';



const ErrorMessage: FC = observer(() => {
    return (

        <div>
            <p>{userStore.message}</p>
        </div>
    );
});

export default ErrorMessage;
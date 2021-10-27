import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../features/mobx/stores/userStore';


const Nav = styled.nav`

`;
const Ul = styled.ul`
    dispaly: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
`;
const Li = styled.li`
    display: inline-block;
    padding: 5px 10px;
`;
const MyLink = styled(Link)`
    text-decoration: none;
    font-size: 23px;
`;

const Navigation: FC = observer(() => {

    const token: string = userStore.token;

    const clean = (): void => {
        localStorage.removeItem('token');
        userStore.setToken('');
    }
    useEffect(() => {

    }, [token])


    return (
        <Nav>
            {token ?
                <Ul>
                    <Li>
                        <MyLink to='/' onClick={() => clean()}>
                            Log Out
                        </MyLink>
                    </Li>
                    <Li>
                        <MyLink to='/privat/dashboard'>
                            Dashboard
                        </MyLink>
                    </Li>
                </Ul>
                :
                <Ul>
                    <Li>
                        <MyLink to='/signin'>
                            Sing In
                        </MyLink>
                    </Li>
                    <Li>
                        <MyLink to='/signup'>
                            Sing Up
                        </MyLink>
                    </Li>
                </Ul>
            }
        </Nav>
    );
});

export default Navigation;
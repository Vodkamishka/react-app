import {Layout, Menu, Row} from 'antd';
import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useHistory()
    const {user} = useTypedSelector(state  => state.auth);

    const {logout} = useActions();
    return (
        <Layout.Header>
            <Row justify='end'>
                {user
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {user.username}
                        </div>
                        <Menu theme='dark' mode="horizontal" selectable={false}>

                            <Menu.Item
                                onClick ={logout}
                                key={'1'}
                            >Logout
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme='dark' mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick ={() => router.push(RouteNames.LOGIN)}
                            key={'1'}
                        >Login
                        </Menu.Item>
                    </Menu>
                }


            </Row>
        </Layout.Header>
    );
};

export default Navbar;
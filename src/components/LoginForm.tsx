import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/utils";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const submit = () => dispatch(AuthActionCreators.login(username, password));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
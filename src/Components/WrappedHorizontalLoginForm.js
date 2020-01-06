import React, {useEffect} from "react";
import {Button, Form, Icon, Input} from "antd";
import Axios from "axios";
import AuthUtil from "../utils/AuthUtil";
import {ELogInStatus} from "../EAccess";


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function HorizontalLoginForm (props) {

    useEffect(() => {
        props.form.validateFields();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            const url = 'http://localhost:3000/user/login';
            if (!err) {
                console.log('Received values of form: ', values);
                const response = await Axios.post(url, values);
                if (response.data.success === true){
                    AuthUtil.setJWTToken(response.data.data.jwttoken, response.data.data.user);
                    props.logInStatus(ELogInStatus.LOGGEDIN);
                }else{
                    alert(response.data.message);
                }
            }
        });
    };

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your userName!' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="userName"
                    />,
                )}
            </Form.Item>
            <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;
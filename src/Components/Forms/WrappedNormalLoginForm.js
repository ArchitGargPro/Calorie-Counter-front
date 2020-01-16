import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from "react";
import Axios from "axios";
import {ELogInStatus} from "../../Constants/EAccess";
import AuthUtil from "../../utils/AuthUtil";
import {Link, Redirect, withRouter} from 'react-router-dom';
import ActionTypes from "../../store/actionTypes";
import {connect} from "react-redux";


function NormalLoginForm (props) {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields( async (err, values) => {
            const url = 'http://localhost:3000/user/login';
            if(!err){
                const response = await Axios.post(url, values);
                if(response.data.success === true){
                    AuthUtil.setJWTToken(response.data.data.jwttoken, response.data.data.user);
                    props.setLoginStatusAction(ELogInStatus.LOGGEDIN);
                    props.history.push('/home');
                }else{
                    alert(response.data.message);
                }
            }
        });
    };

        const { getFieldDecorator } = props.form;
        return (
            <div style={{display : 'flex' , justifyContent : 'center', padding: 50 }}>
            <Form onSubmit={handleSubmit} className="login-form" style={{width : 400}}>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="UserName"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })}
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width : '100%'}}>
                        Log in
                    </Button> <br/>
                    Or <Link to='/signup'>register now!</Link><br/>

                </Form.Item>
            </Form>
            </div>
        );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateTpProps = state =>({
    loginStatus: state.loginStatus
});

const mapDispatchToProps = dispatch =>({
  setLoginStatusAction : loginStatus => dispatch({
      type:ActionTypes.SET_LOGIN_STATUS,
      payload:{
          loginStatus
      }
  })
});

export default connect(mapStateTpProps, mapDispatchToProps)(withRouter(WrappedNormalLoginForm));



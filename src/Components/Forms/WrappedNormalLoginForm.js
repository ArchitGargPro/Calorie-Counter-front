import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import React from "react";
import Axios from "axios";
import {ELogInStatus} from "../../Constants/EAccess";
import AuthUtil from "../../utils/AuthUtil";
import {Link, Redirect, withRouter} from 'react-router-dom';
import ActionTypes from "../../store/actionTypes";
import {connect} from "react-redux";
import Paths from "../../Constants/Path";


function NormalLoginForm (props) {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields( async (err, values) => {
            const url = Paths.home +  'user/login';
            if(!err){
                console.log('values>>>>>>>>', values);
                const response = await Axios.post(url, values);
                console.log(response);
                if(response.data.success === true){
                    console.log('logedskdjkljsklds>>>>>>>>>>>>>>>>>>>>', response.data.data.user);
                    AuthUtil.setJWTToken(response.data.data.jwttoken, response.data.data.user);
                    props.setLoginStatusAction(ELogInStatus.LOGGEDIN);
                    if( AuthUtil.getUser().access === 1){
                        props.history.replace('/me/meal');
                    }
                    else{
                        props.history.replace('/home');
                    }

                }else{
                        notification.open({
                            message: 'LoggedIn Error',
                            description:
                                'response error',
                            // onClick: () => {
                            //     console.log('Notification Clicked!');
                            // },
                        });
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



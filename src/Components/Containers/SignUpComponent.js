import {Button, Form, Input, notification} from "antd";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import {withRouter} from 'react-router-dom';
import Paths from "../../Constants/Path";

function CreateUserForm(props) {
    const [data, setData] = useState({
        name: undefined,
        userName : undefined,
        password : '',
    });
    const [password2, setPassword2] = useState('');

    //send the data to the backend
    const CreateUserData = async () => {
        const url =  Paths.home + 'user/signup';
        const header = AuthUtil.getHeaders();
        const response = await Axios.post(url, data,{"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            //redirect to the view page
            props.history.push('/home');
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });

            // alert();
        }
    };

    const handleChange = (e) =>{
        // console.log(e.target.value);
        // console.log(e.target.name);
        // console.log(e.type);
        // console.log('data, before>>>>>>>', data);
        const d  = data;
        const name = e.target.name
        d[name] = e.target.value;
        // const d = {...data, {[name]:e.target.value,}}
        console.log('<<<<<<<<<d>>>>>>>>>>>>', d);
        setData((prevState) =>{
            return {...prevState, ...d }
        });

        console.log('data, afterr>>>>>>>>>>', data);
    }


    const checkPassword =(e)=>{
        const value = e.target.value;
        setPassword2(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (password2 === data.password) {
            if(data.access > 3 || data.access <= 0) {
                notification.open({
                    message: 'Illegal Access',
                    description:
                        'Access are not 1 , 2 or 3',
                });
            }
            else if (!data.name){
                notification.open({
                    message: 'Empty Name',
                    description:
                        'Name cannot be empty',
                });
            }
            else{
                CreateUserData();
            }
        } else {
            notification.open({
                message: 'Password Dont Match',
                description:
                    'Both Password are not same',
            });
        }


    };
    // const {getFieldDecorator} = props.form;

    return (
        <div>
            {data ?
                (<Form layout='inline' onSubmit={handleSubmit}>
                    <Form.Item label="userName">
                        <Input value={data.userName} name='userName' type='text' onChange={handleChange} />
                    </Form.Item> <br/>
                    <Form.Item label="Password">
                        <Input.Password value={data.password} name='password' type='text' onChange={handleChange}/>
                    </Form.Item> <br/>
                    <Form.Item label="Confirm Password">
                        <Input.Password value={password2} name='password' type='text' onChange={checkPassword}/>
                    </Form.Item> <br/>
                    <Form.Item label="Name">
                        <Input value={data.name} name='name' type='text' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item><br/>
                </Form>):
                (<h1>loading</h1>)
            }
        </div>);
}

const SignUpComponent = Form.create({ name: 'register' })(CreateUserForm);

export default withRouter(SignUpComponent);






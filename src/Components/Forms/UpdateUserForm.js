import {Button, Form, Input, notification} from "antd";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import {withRouter} from 'react-router-dom';
import Paths from "../../Constants/Path";

function UpdateForm(props) {
    console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>', props);
    props.data.password = '';
    const [data, setData] = useState(props.data);
    const [password2, setPassword2] = useState('');

    //userName is passed via data, which is perfect as /me/update and /user/<userID>/update can both access them..
    // const userName = data.userName;  //get the userName from the data passed from the update Component

    //send the data to the backend

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>data',data);
    const updateSingleUserData = async () => {
        const url =  Paths.home + 'user/update';

        const header = AuthUtil.getHeaders();
        //Todo put request not working.....

        const response = await Axios.put(url,  data,{"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        // props.history.goBack()
        if (response.data.success) {
           //Todo redirect to the View of user
            props.history.goBack()

        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });
            // alert(response.data.message);
        }
    };

    const handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
        console.log(e.type);
        console.log('data, before>>>>>>>', data);
        const d  = data;
        const name = e.target.name
        d[name] = e.target.value;
        // const d = {...data, {[name]:e.target.value,}}
        console.log('<<<<<<<<<d>>>>>>>>>>>>', d);
        setData((prevState) =>{
            return {...prevState, ...d }
        });

        console.log('data, afterr>>>>>>>>>>', data);
    };

    const checkPassword = async (e) => {
        const value = e.target.value;
        await setPassword2(value);
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
                else{
                    updateSingleUserData();
                }
        } else {
            notification.open({
                message: 'Password Dont Match',
                description:
                    'Both Password are not same',
            });
        }
        // console.log('clicked>>>>>>>>>>>>>>>>>>', e);
        // console.log(data);


        // updateSingleUserData();


    };
    const {getFieldDecorator} = props.form;

    return (
        <div>
            {data ?

                (<Form layout='inline' onSubmit={handleSubmit}>
                        <h1> Update @{data.userName} </h1>
        {/*<Form.Item label="userName">*/}
        {/*    <Input value={data.userName} name='userName' type='text' onChange={handleChange} />*/}
        {/*</Form.Item> <br/>*/}
        <Form.Item label="New Password">
            <Input value={data.password} name='password' type='password' onChange={handleChange}/>
        </Form.Item> <br/>
        <Form.Item label="Check Password">
            <Input value={password2} name='password' type='password' onChange={checkPassword}/>
        </Form.Item> <br/>
        <Form.Item label="Name">
            <Input value={data.name} name='name' type='text' onChange={handleChange}/>
        </Form.Item><br/>
                        {(AuthUtil.getUser().access !== 1 && AuthUtil.getUser().userName !== data.userName )?<Form.Item label="Access">
                            <Input value={data.access} name='access' type='number' onChange={handleChange}/>
                        </Form.Item> : null}
        <br/>
                    {(AuthUtil.getUser().access !== 1 && AuthUtil.getUser().userName !== data.userName)?
        <Form.Item label="Calories">
          <Input value={data.calorie} name="calorie" type='number' onChange={handleChange}/>
        </Form.Item> : null }
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item><br/>
    </Form>
               ):
                (<h1>loading</h1>)
            }
        </div>);
}

const UpdateUserForm = Form.create({ name: 'register' })(UpdateForm);

export default withRouter(UpdateUserForm);
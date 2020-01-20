import {Button, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import {withRouter} from 'react-router-dom';
function UpdateForm(props) {
    console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>', props);
    props.data.password = ''
    const [data, setData] = useState(props.data);
    const [password2, setPassword2] = useState('');


    //userName is passed via data, which is perfect as /me/update and /user/<userID>/update can both access them..
    const userName = data.userName;  //get the userName from the data passed from the update Component

    //send the data to the backend
    const updateSingleUserData = async () => {
        const url = 'http://localhost:3000/user/update';

        const header = AuthUtil.getHeaders();
        //Todo put request not working.....
        const response = await Axios.put(url,  data,{"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        // props.history.goBack()
        if (response.data.success) {
           //Todo redirect to the View of user
            props.history.goBack()

        } else {
            alert(response.data.message);
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
    }


    const checkPassword =(e)=>{
        const value = e.target.value;
        setPassword2(value);
        if(password2 === data.password){

        }else{
            alert('error, password dont match')
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('clicked>>>>>>>>>>>>>>>>>>', e);
        // console.log(data);
        updateSingleUserData();

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
            <Input.Password value={data.password} name='password' type='text' onChange={handleChange}/>
        </Form.Item> <br/>
        <Form.Item label="Check Password">
            <Input.Password value={password2} name='password' type='text' onChange={checkPassword}/>
        </Form.Item> <br/>
        <Form.Item label="Name">
            <Input value={data.name} name='name' type='text' onChange={handleChange}/>
        </Form.Item><br/>
        <Form.Item label="Access">
           <Input value={data.access} name='access' type='number' onChange={handleChange}/>
        </Form.Item><br/>
        <Form.Item label="Calories">
          <Input value={data.calorie} name="calorie" type='number' onChange={handleChange}/>
        </Form.Item><br/>
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
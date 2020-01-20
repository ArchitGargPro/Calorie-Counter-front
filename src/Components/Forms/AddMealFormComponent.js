import {Form, Input, Button} from 'antd';
import {ETables} from "../../Constants/EAccess";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import Paths from "../../Constants/Path";

function AddMealForm(props) {

    const [data, setData] = useState({
        title : "",
        calorie : 0,
        date  : "",
        time : "",
        id: '',
    });

    const userId = props.match.params.userId;
    //this userName is send when a admin creates meal for a  user.... named userName,



    const addMealData = async () => {
        const url = Paths.local +  "meal/new";
        const headers = AuthUtil.getHeaders();

        const d = {...data, 'userName': userId};


        const response = await Axios.post(url,d,{"headers": headers});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            //redirect to the view page
             props.history.push('/user/' + userId + '/meal/');
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
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked>>>>>>>>>>>>>>>>>>', e);
        console.log(data);
        addMealData();

    };

    return (
        <div>
            {data ?
                (<Form layout='inline' onSubmit={handleSubmit}>
                    <Form.Item label="Title">
                        <Input value={data.title} name='title' type='text' onChange={handleChange} />
                    </Form.Item> <br/>
                    <Form.Item label="Calorie">
                        <Input value={data.calorie} name='calorie' type='number' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item label="Date">
                        <Input value={data.date} name='date' type='text' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item label="Time">
                        <Input value={data.time} name="time" type='text' onChange={handleChange}/>
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

const AddMealFormComponent = Form.create({ name: 'register' })(AddMealForm);

export default AddMealFormComponent;



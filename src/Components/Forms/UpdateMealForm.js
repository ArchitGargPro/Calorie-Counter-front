import {Button, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import Paths from "../../Constants/Path";
import {withRouter} from 'react-router-dom';

import moment from 'moment-timezone';

function UpdateForm(props) {
    console.log('rops', props);
    // props.data.password = ''


    const [data, setData] = useState(props.data);
    const mealId   = props.match.params.mealId;
    const userId   = props.match.params.userId;
    console.log('<<<<<<<<<<<<<<<<<<<datadatafdsafdsafd', data);


    const checkDate = () =>{
        if (!moment(data.date, 'YYYY/MM/DD').isValid()) {
            return data.date;
        }
        else{
            return null
        }

    };

    //send the data to the backend
    const updateSingleMealData = async () => {
        const url =   Paths.local + 'meal/update';
        const header = AuthUtil.getHeaders();
        const values = {
            'id' : mealId,
            ...data,
            'date' :checkDate(),
        };

        const response = await Axios.put(url, values, {"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            console.log('success')

            props.history.push('/user/'+ userId + '/meal/' + mealId);
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

        updateSingleMealData();
    };

    return (
        <div>
            {data ?
                (<Form layout='inline' onSubmit={handleSubmit}>
                    <Form.Item label="title">
                        <Input value={data.title} name='title' type='text' onChange={handleChange} />
                    </Form.Item> <br/>
                    <Form.Item label="calorie">
                        <Input value={data.calorie} name='calorie' type='text' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item label="date">
                        <Input value={data.date} name='date' type='text' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item label="time">
                        <Input value={data.time} name="time" type='text' onChange={handleChange}/>
                    </Form.Item><br/>
                    <Form.Item>
                        {/*<FormItem {} label="Publish Date">*/}
                        {/*    {getFieldDecorator('publishDate', {*/}
                        {/*        initialValue: moment(),*/}
                        {/*        rules: [*/}
                        {/*            {*/}
                        {/*                type: 'object',*/}
                        {/*                required: false,*/}
                        {/*                message: 'Please input publishDate',*/}
                        {/*                whitespace: true,*/}
                        {/*            },*/}
                        {/*        ],*/}
                        {/*    })(<DatePicker/>)}*/}
                        {/*</FormItem>*/}
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item><br/>
                </Form>):
                (<h1>loading</h1>)
            }
        </div>);
}

const UpdateMealForm = Form.create({ name: 'register' })(withRouter(UpdateForm));

export default UpdateMealForm;



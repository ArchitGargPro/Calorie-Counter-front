import {Button, DatePicker, Form, Input, notification, TimePicker} from "antd";
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
    // console.log('<<<<<<<<<<<<<<<<<<<datadatafdsafdsafd', data);

    //send the data to the backend
    const updateSingleMealData = async () => {
        const url =   Paths.home + 'meal/update';
        const header = AuthUtil.getHeaders();
        const values = {
            'id' : mealId,
            ...data,
            // 'date' :checkDate(),
        };

        console.log('data before sending >>>>>>>>>>>>>>>', values, values.data);

        const response = await Axios.put(url, values, {"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            // console.log('success')
            (AuthUtil.getUser().access === 1) ? props.history.push('/me/meal/' )  :
            props.history.push('/user/'+ userId + '/meal/' + mealId);
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });
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
        console.log('<<<<<<<<<d>>>>>>>>>>>>', d);
        setData((prevState) =>{
            return {...prevState, ...d }
        });

        console.log('data, afterr>>>>>>>>>>', data);
    };



    const setDatePickerManager = (e) =>{
        const d = data;
        console.log(e.format('DD/MM/YYYY'));
        console.log(d);
        console.log(typeof d['date']);
        d['date'] = e.format('YYYY/MM/DD');
        console.log(d);

        setData((prevState) => {
                return {...prevState, ...d}
            }
        );
        console.log('e.target.value}}}}}}}}}}}}}}}}}}}}}}}}}', d, data)
    };


    const setTimeHandle = (e) =>{
        const d = data;
        console.log(d);
        d['time'] = e.format('HH:mm');
        console.log(d);

        setData((prevState) => {
                return {...prevState, ...d}
            }
        );
        console.log('e.target.value}}}}}}}}}}}}}}}}}}}}}}}}}', e)

    };




    const handleSubmit = (e) => {
        e.preventDefault();

        if(!data.title) {
            notification.open({
                message: 'Empty Title',
                description:
                    'Title cant be empty',
            });
        }
        else if(data.calorie < 0) {
            notification.open({
                message: 'Negative Calorie',
                description:
                    'Calorie cant be negative',
            });
        }
        else{
            updateSingleMealData();
        }



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
                        <Form.Item label="DatePicker">
                            <DatePicker allowClear={false} onChange={setDatePickerManager} />
                        </Form.Item><br/>
                        <Form.Item label="Time">
                            {/*<Input value={data.time} name="time" type='text' onChange={handleChange}/>*/}
                            <TimePicker allowClear={false} format="HH:mm" placeholder="time" onChange={setTimeHandle}/>
                        </Form.Item><br/>

                    {/*<Form.Item label="date">*/}
                    {/*    <Input value={data.date} name='date' type='text' onChange={handleChange}/>*/}
                    {/*</Form.Item><br/>*/}
                    {/*<Form.Item label="time">*/}
                    {/*    <Input value={data.time} name="time" type='text' onChange={handleChange}/>*/}
                    {/*</Form.Item><br/>*/}
                    {/*<Form.Item>*/}
                    {/*    /!*<FormItem {} label="Publish Date">*!/*/}
                    {/*    /!*    {getFieldDecorator('publishDate', {*!/*/}
                    {/*    /!*        initialValue: moment(),*!/*/}
                    {/*    /!*        rules: [*!/*/}
                    {/*    /!*            {*!/*/}
                    {/*    /!*                type: 'object',*!/*/}
                    {/*    /!*                required: false,*!/*/}
                    {/*    /!*                message: 'Please input publishDate',*!/*/}
                    {/*    /!*                whitespace: true,*!/*/}
                    {/*    /!*            },*!/*/}
                    {/*    /!*        ],*!/*/}
                    {/*    /!*    })(<DatePicker/>)}*!/*/}
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

const UpdateMealForm = Form.create({ name: 'register' })(withRouter(UpdateForm));

export default UpdateMealForm;



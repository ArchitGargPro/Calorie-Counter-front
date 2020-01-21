import {Form, Input, Button, notification, DatePicker, TimePicker} from 'antd';
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

    let userId = undefined;
    if (AuthUtil.getUser().access === 1){
        userId = AuthUtil.getUser().userName;
    }else {
        userId = props.match.params.userId;
    }
    //this userName is send when a admin creates meal for a  user.... named userName,



    const addMealData = async () => {
        const url = Paths.home +  "meal/new";
        const headers = AuthUtil.getHeaders();

        const d = {...data, 'userName': userId};

        console.log('DDdddddK///////////////////////', d);

        const response = await Axios.post(url,d,{"headers": headers});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            //redirect to the view page
            (AuthUtil.getUser().access === 1) ? props.history.push('/me/meal') :
             props.history.push('/user/' + userId + '/meal/');
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
        const d  = data;
        const name = e.target.name
        d[name] = e.target.value;
        setData((prevState) =>{
            return {...prevState, ...d }
        });
    };


    const setDatePickerManager = (e) =>{
        const d = data;
        console.log(e.format('DD/MM/YYYY'));
        console.log(d);
        console.log(typeof d['date']);
        d['date'] = e.format('DD/MM/YYYY');
        console.log(d);

        setData((prevState) => {
                return {...prevState, ...d}
            }
        );
        console.log('e.target.value}}}}}}}}}}}}}}}}}}}}}}}}}', e)
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
            addMealData();
        }

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
                    <Form.Item label="DatePicker">
                        <DatePicker allowClear={false} onChange={setDatePickerManager} />
                    </Form.Item><br/>
                    {/*<Form.Item label="Date">*/}
                    {/*    <Input value={data.date} name='date' type='text' onChange={handleChange}/>*/}
                    {/*</Form.Item><br/>*/}
                    <Form.Item label="Time">
                        {/*<Input value={data.time} name="time" type='text' onChange={handleChange}/>*/}
                        <TimePicker allowClear={false} format="HH:mm" placeholder="time" onChange={setTimeHandle}/>
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



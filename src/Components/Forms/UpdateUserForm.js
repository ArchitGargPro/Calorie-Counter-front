import {Button, Form, Input} from "antd";
import React, {useEffect, useState} from "react";

function UpdateForm(props) {

    // console.log('form>>>>>>>>>>>>>>>>>>>>>', props);
    const [data, setData] = useState(props.data);

    console.log('<<<<<<<<<<<<<<<<<<<datadatafdsafdsafd', data);
    // const d = props.data;
    // console.log('dddddddddddddd', d);



    // useEffect(() => {
    //     // console.log('data',data);
    //     setData(d);
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked>>>>>>>>>>>>>>>>>>', e.target);
        // props.form.validateFieldsAndScroll(async (err, values) => {
        //     if (!err) {
        //         await addNewData(values);
        //     }
        // });
    };
    const {getFieldDecorator} = props.form;

    return (
        <div>
            {data ?
                (<Form layout='inline' onSubmit={handleSubmit}>
        <Form.Item label="userName">
            <Input value={data.userName} type='text'/>
        </Form.Item> <br/>
        <Form.Item label="Update-Password">
            <Input.Password value='' type='text'/>
        </Form.Item> <br/>
        <Form.Item label="Name">
            {getFieldDecorator('name', {
                rules: [{
                    required: true,
                    message: 'This is a required field',
                }]
            })(<Input value={data.name} type='text'/>)}
        </Form.Item><br/>
        <Form.Item label="Access">
           <Input type='number'/>
        </Form.Item><br/>
        <Form.Item label="Calories">
          <Input setFieldsValue={data.calorie} type='number'/>
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

const UpdateUserForm = Form.create({ name: 'register' })(UpdateForm);

export default UpdateUserForm;
import {Form, Input, Button} from 'antd';
import React, {useState} from "react";
import {ETables} from "../EAccess";

function NewItemForm(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    const { getFieldDecorator } = props.form;

    const addNewRow = async (e) => {
        e.preventDefault();
        console.log('Received values of form: ', e.target.value);
    };

    console.log(props.currentTable);

    if(props.currentTable === ETables.USER) {
        return (<Form layout='vertical' onSubmit={handleSubmit}>
            <Form.Item label="userName">
                {getFieldDecorator('userName', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input type='text'/>)}
            </Form.Item>
            <Form.Item label="password">
                {getFieldDecorator('password', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input.Password type='text'/>)}
            </Form.Item>
            <Form.Item label="Name">
                {getFieldDecorator('name', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input type='text'/>)}
            </Form.Item>
            <Form.Item label="access">
                {getFieldDecorator('access', {
                    // rules:[{
                    //     required: false,
                    //     message: 'This is a required field',
                    // }]
                })(<Input type='number'/>)}
            </Form.Item>
            <Form.Item label="Expected Calories per Day">
                {getFieldDecorator('description', {
                    // rules:[{
                    //     required: true,
                    //     message: 'This is a required field',
                    // }]
                })(<Input type='number'/>)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>);
    } else {
        return (<Form layout='vertical' onSubmit={handleSubmit}>
            <Form.Item label="calories">
                {getFieldDecorator('calories', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input type='number'/>)}
            </Form.Item>
            <Form.Item label="Description">
                {getFieldDecorator('description', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input type='text'/>)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>);
    }
}

const WrappedNewItemForm = Form.create({ name: 'register' })(NewItemForm);

export default WrappedNewItemForm;

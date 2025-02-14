import {Form, Input, Button, notification} from 'antd';
import React from "react";
import {ETables} from "../../Constants/EAccess";
import {connect} from "react-redux";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import Paths from "../../Constants/Path";

function NewItemForm(props) {

    const addNewData = async (values) => {
        let url;
        if(props.currentTable === ETables.MEAL) {
            url = Paths.home + "meal/new";
        } else {
            url =  Paths.home + "user/new"
        }
        const headers = AuthUtil.getHeaders();
        const response = await Axios.post(url, values, {"headers":headers});
        if(response.data.success) {
            props.setVisible(false);
            props.setNewRowAlert(true);
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await addNewData(values);
            }
        });
    };
    const { getFieldDecorator } = props.form;

    if(props.currentTable === ETables.USER) {
        return (<Form layout='inline' onSubmit={handleSubmit}>
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
            <Form.Item label="Access">
                {getFieldDecorator('access', {})(<Input type='number'/>)}
            </Form.Item>
            <Form.Item label="Expected Calories per Day">
                {getFieldDecorator('calorie', {})(<Input type='number'/>)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>);
    } else {
        return (<Form layout='inline' onSubmit={handleSubmit}>
            <Form.Item label="Calories">
                {getFieldDecorator('calorie', {
                    rules:[{
                        required: true,
                        message: 'This is a required field',
                    }]
                })(<Input type='number'/>)}
            </Form.Item>
            <Form.Item label="Description">
                {getFieldDecorator('title', {
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

const mapStateToProps = state => ({
    currentTable : state.currentTable
});

export default connect(mapStateToProps)(WrappedNewItemForm);

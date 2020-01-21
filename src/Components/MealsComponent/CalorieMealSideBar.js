import {Layout, Menu, Input, Dropdown, Button, Icon, TimePicker, DatePicker} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import AuthUtil from "../../utils/AuthUtil";
import Search from "antd/es/input/Search";
import ActionTypes from "../../store/actionTypes";
import {connect} from 'react-redux';

const {Sider} = Layout;


function CalorieMealSideBar(props){

    const searchHandle = (value) =>{
        props.setExpectedValue(value);
    };

    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub3']}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item key="1"> <Link to={(AuthUtil.getUser()).access === 1 ? '/me/meal' : '/home'} >Home</Link></Menu.Item>
                <Menu.Item key="2" ><Link to='/me'>View Profile</Link></Menu.Item>
                <Menu.Item key="3" >Expected Calories</Menu.Item>
                <Menu.Item key="3"><Search placeholder="search" onSearch={searchHandle}  enterButton /></Menu.Item>

            </Menu>
        </Sider>
    );
}


const mapDispatchToProps = dispatch => ({
    setExpectedValue : (expectedValue) => dispatch({
        type: ActionTypes.SET_EXPECTED_DATA,
        payload: {
            expectedValue
        }
    })
});




export default connect(mapDispatchToProps)(CalorieMealSideBar);
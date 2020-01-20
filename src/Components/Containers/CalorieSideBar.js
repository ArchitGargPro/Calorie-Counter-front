import {Layout, Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";
const {Sider} = Layout;


function CalorieSideBar(){
    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="2"><Link to='/me'>View Profile</Link></Menu.Item>
                <Menu.Item key="1"><Link to='/home'>All Users</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/meals'>All Meals</Link></Menu.Item>


            </Menu>
        </Sider>
    );
}

export default CalorieSideBar;
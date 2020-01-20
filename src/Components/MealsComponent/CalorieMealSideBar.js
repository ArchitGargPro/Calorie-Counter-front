import {Layout, Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";
const {Sider} = Layout;


function CalorieMealSideBar(){
    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item key="1"><a>Home</a></Menu.Item>
                <Menu.Item key="2"><Link to='/me'>View Profile</Link></Menu.Item>

                <Menu.Item key="2">Expected Calories</Menu.Item>
            </Menu>
        </Sider>
    );
}

export default CalorieMealSideBar;
import {Layout, Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";
import AuthUtil from "../../utils/AuthUtil";
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
                <Menu.Item key="1"><Link to='/home'>Home</Link></Menu.Item>
                {(AuthUtil.getUser().access === 3)?<Menu.Item key="3"><Link to='/meals'>All Meals</Link></Menu.Item>
                : null}



            </Menu>
        </Sider>
    );
}

export default CalorieSideBar;
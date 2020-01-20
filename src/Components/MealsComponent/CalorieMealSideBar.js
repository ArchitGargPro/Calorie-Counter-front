import {Layout, Menu, Input, Dropdown, Button, Icon, TimePicker, DatePicker} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
const {Sider} = Layout;


function CalorieMealSideBar(props){
    const [timeFilter, setTimeFilter] = useState('none');
    const [dateFilter, setDateFilter] = useState( 'none');
    const [visible, setVisible] = useState(false);
    const [time1, setTime1] = useState(null);
    const [time2, setTime2] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';

    const setDateFilterAlert = (dates) => {
        if (dates.length === 2) {
            const date1 = moment(dates[0]).format('DD/MM/YYYY');
            const date2 = moment(dates[1]).format('DD/MM/YYYY');
            props.setDateFilter({
                date1: date1,
                date2: date2
            });
        } else {
            props.setDateFilter(null);
        }
    };

    const setTimeFilterAlert = () => {
    };


    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub3']}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item key="1"><a>Home</a></Menu.Item>
                <Menu.Item key="2" ><Link to='/me'>View Profile</Link></Menu.Item>
                <Menu.Item key="3" >Expected Calories</Menu.Item>
                <Menu.Item key="3"><Input placeholder="Expected Calories" /></Menu.Item>
            {/*    <Menu.Item key="4" >*/}
            {/*        <RangePicker*/}
            {/*            // style={{display:dateFilter}}*/}
            {/*            format={dateFormat}*/}
            {/*            defaultPickerValue={null}*/}
            {/*            onChange={setDateFilterAlert} />*/}
            {/*    </Menu.Item>*/}
            {/*<Menu.Item key="5" >*/}
            {/*    <TimePicker  format="HH:mm" placeholder="start" onChange={setTime1}/>*/}
            {/*    <TimePicker  format="HH:mm" placeholder="end" onChange={setTime2}/>*/}
            {/*</Menu.Item>*/}
            {/*    <Menu.Item key="6" >*/}

            {/*    </Menu.Item>*/}
            </Menu>
        </Sider>
    );
}

export default CalorieMealSideBar;
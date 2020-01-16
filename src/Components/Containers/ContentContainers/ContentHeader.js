import {Button, DatePicker, Dropdown, Icon, Menu, TimePicker} from "antd";
import React, {useEffect, useState} from "react";
import WrappedNewItemForm from "../../Forms/NewItemForm";
import Modal from "antd/es/modal";
import {connect} from "react-redux";
import moment from "moment";
import {ETables} from "../../../Constants/EAccess";
import Search from "antd/es/input/Search";
import AddMealFormComponent from "../../Forms/AddMealFormComponent";
import AddUserFormComponent from "../../Forms/AddUserFormComponent";
import {Link} from 'react-router-dom';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

function CalorieContentHeader(props) {
    const [filter, setFilter] = useState("Filter");
    const [timeFilter, setTimeFilter] = useState('none');
    const [dateFilter, setDateFilter] = useState( 'none');
    const [visible, setVisible] = useState(false);
    const [time1, setTime1] = useState(null);
    const [time2, setTime2] = useState(null);

    useEffect(() => {
        if(time1 !== null && time2 !== null && time1 !== time2 ) {
            setTimeFilterAlert();
        }
    }, [time1, time2]);

    const menu = (
        <Menu onClick={onHandleMenuClick}>
            <Menu.Item key="1" >
                <Icon type="filter" />
                By Date
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="filter" />
                By Time
            </Menu.Item>
        </Menu>
    );

    function onHandleMenuClick(e){
        switch (e.key) {
            case "1": setFilter("By Date");
                setDateFilter("");
                setTimeFilter('none');
                break;
            case "2": setFilter("By Time");
                setDateFilter('none');
                setTimeFilter('');
                break;
            default: setFilter("Filter")
        }
    }

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

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const searchHandle = (value) => {
    };

    const setHeader = () => {
        if (props.currentTable === ETables.MEAL) {
            return (
                <span>
                    <Dropdown overlay={menu} >
                        <Button style={{marginRight:'20px'}}>
                            {filter}<Icon type="down" />
                        </Button>
                    </Dropdown>
                    <RangePicker
                        style={{display:dateFilter}}
                        format={dateFormat}
                        defaultPickerValue={null}
                        onChange={setDateFilterAlert} />
                    <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="start-time" onChange={setTime1}/>
                    <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="end-time" onChange={setTime2}/>
                </span>
            );
        } else {
            return (
                <span  style={{float:'left', margin:'15px'}}>
                    <Search placeholder="Search by userName" onSearch={searchHandle} enterButton />
                </span>
            );
        }
    };

    return(
        <span>
            {setHeader()}
            <span style={{float:'right'}}>
                <Link to={(props.currentTable === ETables.MEAL)? '/new/meal' : '/new/user'} ><Button  type="primary" shape="circle" icon="plus" size="large" visible={(!visible).toString()} /></Link>

            </span>
        </span>
    );
}

const mapStateToProps = state => ({
    alert: state.userAlert,
    currentTable: state.currentTable
});

export default connect(mapStateToProps)(CalorieContentHeader);

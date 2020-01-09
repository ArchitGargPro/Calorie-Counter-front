import {Button, DatePicker, Dropdown, Icon, Menu, TimePicker} from "antd";
import React, {useEffect, useState} from "react";
import WrappedNewItemForm from "../NewItemForm";
import Modal from "antd/es/modal";
import {connect} from "react-redux";
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

function CalorieContentHeader(props) {
    const [filter, setFilter] = useState("Filter");
    const [timeFilter, setTimeFilter] = useState('none');
    const [dateFilter, setDateFilter] = useState( 'none');
    const [visible, setVisible] = useState(false);
    const [time1, setTime1] = useState(null);
    const [time2, setTime2] = useState(null);

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

    const setDateFilterAlert = (e) => {
      console.log(e);
    };

    const setTimeFilterAlert = () => {
        console.log();
    };
    // TODO add METHODS

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return(
        <div>
            <Dropdown overlay={menu} >
                <Button style={{marginRight:'20px'}}>
                    {filter} <Icon type="down" />
                </Button>
            </Dropdown>
            <RangePicker
                style={{display:dateFilter}}
                format={dateFormat}
                onChange={setDateFilterAlert}
            />
            <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="start-time" onChange={setTime1}/>
            <TimePicker style={{display: timeFilter}} format="HH:mm" placeholder="end-time" onChange={setTime2}/>
            <span style={{float:'right'}}>
                <Button  type="primary" shape="circle" icon="plus" size="large" visible={(!visible).toString()} onClick={showModal} />
                <Modal visible={visible} footer={null} onCancel={hideModal}>
                    <WrappedNewItemForm setVisible={setVisible} setNewRowAlert={props.setNewRowAlert}/>
                </Modal>
            </span>
        </div>
    );
}

const mapStateToProps = state => ({
    alert: state.userAlert
});

export default connect(mapStateToProps)(CalorieContentHeader);

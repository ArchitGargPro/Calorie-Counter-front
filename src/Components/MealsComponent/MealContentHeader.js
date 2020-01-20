import {Button, DatePicker, Dropdown, Icon, Menu, TimePicker} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {ETables} from "../../Constants/EAccess";
import Search from "antd/es/input/Search";
import {Link, withRouter} from 'react-router-dom';
import AuthUtil from "../../utils/AuthUtil";
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

function MealContentHeader(props) {
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


    const setHeader = () => {
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
    };

    return(
        <span>
            {setHeader()}
            {(props.match.url === '/meals')?
                null
                :
                <span style={{float:'right'}}>
                {(AuthUtil.getUser().access ===1) ?
                    (<Link to='/me/new/meal' ><Button  type="primary" shape="circle" icon="plus" size="large" visible={(!visible).toString()} /></Link>)
                    :
                    (<Link to={props.match.url + '/new/'} ><Button  type="primary" shape="circle" icon="plus" size="large" visible={(!visible).toString()} /></Link>)

                }
            </span>

            }

        </span>
    );
}

const mapStateToProps = state => ({
    currentTable: state.currentTable
});

export default connect(mapStateToProps)(withRouter(MealContentHeader));

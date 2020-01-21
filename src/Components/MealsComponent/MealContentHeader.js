import {Button, DatePicker, Dropdown, Icon, Menu, TimePicker} from "antd";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {ETables} from "../../Constants/EAccess";
import Search from "antd/es/input/Search";
import {Link, withRouter} from 'react-router-dom';
import AuthUtil from "../../utils/AuthUtil";
import ActionTypes from "../../store/actionTypes";
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

function MealContentHeader(props) {

    // console.log('MEalContentHeader', props);


    // const [filter, setFilter] = useState("Filter");
    const [visible, setVisible] = useState(false);
    const [time1, setTime1] = useState(null);
    const [time2, setTime2] = useState(null);

    const [dateFilter, setDateFilter] = useState(null);
    const [timeFilter, setTimeFilter] = useState(null);
    // const [newRowAlert, setNewRowAlert] = useState(false);

    useEffect(() => {
        if(time1 !== null && time2 !== null && time1 !== time2 ) {
            setTimeFilterAlert();
        }
    }, [time1, time2]);

    // const menu = (
    //     <Menu onClick={onHandleMenuClick}>
    //         <Menu.Item key="1" >
    //             <Icon type="filter" />
    //             By Date
    //         </Menu.Item>
    //         <Menu.Item key="2">
    //             <Icon type="filter" />
    //             By Time
    //         </Menu.Item>
    //     </Menu>
    // );

    // function onHandleMenuClick(e){
    //     switch (e.key) {
    //         case "1": setFilter("By Date");
    //             setDateFilter("");
    //             setTimeFilter('none');
    //             break;
    //         case "2": setFilter("By Time");
    //             setDateFilter('none');
    //             setTimeFilter('');
    //             break;
    //         default: setFilter("Filter")
    //     }
    // }



    const setDateFilterAlert = (dates) => {
        if (dates.length === 2) {
            const date1 = moment(dates[0]).format('DD/MM/YYYY');
            const date2 = moment(dates[1]).format('DD/MM/YYYY');
            setDateFilter({
                date1: date1,
                date2: date2
            });
            // console.log('date1>>>>>>>>>>>>>>', date1);
            // console.log('date2>>>>>>>>>>>>>>>>', date2);
            //TODO
            props.setStartDate(date1);
            props.setEndDate(date2);

        } else {
            setDateFilter(null);
        }
    };

    const setTimeFilterAlert = () => {
    };


    const searchHandle = (value) => {
        props.setSearch(value)
    };

    const setStartTimeHandle = (e)=>{
        // console.log('e>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
        const time = e.format('HH:mm');
        props.setStartTime(time);
    };

    const setEndTimeHandle = (e)=>{
        console.log('e>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', e);
        const time = e.format('HH:mm');
        props.setEndTime(time);
    };


    //todo build a state tht keeps track of all the filter changes and onchange send to tabe meal which call the bckend
    //with that filter/....




    const setHeader = () => {
            return (
                <span>
                    <RangePicker
                        allowClear={false}
                        style={{display:dateFilter}}
                        format={dateFormat}
                        defaultPickerValue={null}
                        onChange={setDateFilterAlert} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    {/*setTime1*/}
                    <TimePicker allowClear={false} style={{display: timeFilter}} format="HH:mm" placeholder="start-time" onChange={setStartTimeHandle}/>
                    <TimePicker allowClear={false} style={{display: timeFilter}} format="HH:mm" placeholder="end-time" onChange={setEndTimeHandle}/>

                       <span  style={{float:'left', margin:'15px'}}>
                            <Search placeholder="search" onSearch={searchHandle}  enterButton />
                        </span>
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
    mealData : state.mealData
});

const mapDispatchToProps = dispatch => ({
    updateMealDataAction: mealData => dispatch({
        type: ActionTypes.SET_MEAL_DATA,
        payload: {
            mealData
        }
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MealContentHeader));

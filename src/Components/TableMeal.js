import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Table, Tag} from "antd";
import AuthUtil from "../utils/AuthUtil";
import {Link, withRouter} from "react-router-dom";
import Paths from "../Constants/Path";
import {connect} from 'react-redux';
import ActionTypes from "../store/actionTypes";

//get all meal by a username


function TableMeal(props) {
    const [totalPageLength, setTotalPageLength] = useState(0);
    const [pageNo, setPageNo] = useState(1);


    console.log('<<<<<<<<<<<<<<<tablemeal>>>>>>>>>>>>>>>>>>>>>>>>>', props.props);


    const expected = 2000;  // todo  onchange value here

    const getColor = (calorie) => {
        if (calorie > expected) {
            return 'red';
        }
        return 'green';
    };

    const columnSet = {
        meal: [
            {
                title: 'Date',
                dataIndex: 'date',
            },
            {
                title: 'Time',
                dataIndex: 'time',
            },
            {
                title: 'Calories',
                dataIndex: 'calorie',
                render: (record) => {
                    console.log('record', record);
                    return (
                        <Tag color={getColor(record)}>{record}</Tag>
                    );
                }
            },
            {
                title: 'Description',
                dataIndex: 'title',
            },
            {
                title: '',
                dataIndex: '',
                render: (record) => {
                    const pk = record.id;
                    return (
                        (props.match.url === '/meals') ? null : (<Link to={props.match.url + '/' + pk}>View</Link>)
                    );
                }
            },
        ],
    };

    // const [data, setData] = useState(null);   // hardcoding , rest is null

    useEffect(() => {
        // console.log('data',data);
        getMealData().then((res) => console.log('res', res));
        // console.log('data, ', data);
    }, [pageNo]);



    // const userName = props.userName;


    const getMealData = async () => {
        console.log('inside >>>>>>>>>>>>>>>>>>>>>>>');
        let url =  Paths.home + 'meal/?limit=10';

        let page = '&page=' + pageNo;

        url = url + '&fromDate=' + props.props.startDate;
        url = url + '&toDate=' + props.props.endDate;
        url = url + '&fromTime=' + props.props.startTime;
        url = url + '&toTime=' + props.props.endTime;
        url = url + '&title='  + props.props.search;
        // url = url + '&fromDate'
        // url = url + '&fromDate'


        url = url + page;
        // const url = 'http://192.168.0.152:3000/meal';
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', props.userName);
        if (props.userName) {
            url = url +  '&userName=' +props.userName;
        } // null => get all meal as admin viewing , if user then userName is Authutil...
        console.log(url);
        const header = AuthUtil.getHeaders();
        try {
            const response = await Axios.get(url,{"headers": header},);
            console.log('//////////response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response);
            if (response.data.success) {
                const d = response.data.data;
                setTotalPageLength(response.data.dataLength);

                props.updateMealDataAction(d);
            }

        } catch (e) {
            alert('invalid ');
        }
    };


    useEffect(()=>{
        getMealData()

    },[props.props.startDate, props.props.endDate]);


    useEffect(()=>{
        if(props.props.startTime !== '' && props.props.endTime !== ''){
            getMealData()
        }
    }, [props.props.startTime, props.props.endTime]);


    useEffect(()=>{
        if(props.props.search !== ''){
            getMealData()
        }
    }, [props.props.search ]);

    return (<Table
        dataSource={props.mealData}
        columns={columnSet.meal}
        pagination={{
            position: 'bottom',
            defaultCurrent: 1,
            pageSize: 10,
            total: totalPageLength,
            onChange: (page) => {
               setPageNo(page);
            }
        }}
    />)

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



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableMeal));
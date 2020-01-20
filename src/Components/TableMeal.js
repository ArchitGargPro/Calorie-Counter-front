import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Table, Tag} from "antd";
import AuthUtil from "../utils/AuthUtil";
import {Link, withRouter} from "react-router-dom";
import Paths from "../Constants/Path";
import {connect} from 'react-redux';
import ActionTypes from "../store/actionTypes";

//get all meal by a username

//Todo first make for the user , on shown at /home
// Todo then make for admin to view any user

function TableMeal(props) {
    //TODO if passed userName then get the data for the that userName, else
    const expected = 2000;

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
    }, []);

    const userName = props.userName;

    const getMealData = async () => {
        console.log('inside >>>>>>>>>>>>>>>>>>>>>>>')
        let url =  Paths.local + 'meal/?page=1&limit=10';
        // const url = 'http://192.168.0.152:3000/meal';
        if (props.userName) {
            url = url +  '&userName=' +props.userName;
        }
        console.log(url);
        const header = AuthUtil.getHeaders();
        try {
            const response = await Axios.get(url,{"headers": header},);
            console.log('//////////response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response);
            if (response.data.success) {
                const d = response.data.data;
                props.updateMealDataAction(d);
            }

        } catch (e) {
            alert('invalid ');
        }
    };
    return (<Table
        dataSource={props.mealData}
        columns={columnSet.meal}
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
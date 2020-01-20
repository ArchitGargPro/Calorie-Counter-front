import React, {useEffect, useState} from 'react';
import {Layout, Table} from "antd";
import CalorieSideBar from "./Containers/CalorieSideBar";
import ContentContainer from "./Containers/ContentContainer";
import {Link} from "react-router-dom";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import Paths from "../Constants/Path";

function ViewAllMeals(props) {
    console.log('<<<<<<<<<<????????????????>>>>>>>>>>>>>>Meals', props);
    const userName = props.match.params.userId;
    console.log(userName);
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
                editable: true,
                inputType: 'number'
            },
            {
                title: 'Description',
                dataIndex: 'title',
                editable: true,
                inputType: 'string'
            },
            {
                title: '',
                dataIndex: '',


                render: (record) => {
                    const pk = record.id;
                    console.log('<<<<<<<<<<<<<<<<<record>>>>>>>>>>', record);
                    return (
                        <Link to={`/meal/${pk}`}>View</Link>
                    );
                }
            },
        ],
    };

    const [data, setData] = useState(  [{
        "title": "dinner",
        "calorie": "2367",
        "date": "16/1/2020",
        "time": "14:5:46",
        "id": 2
    },
        {
            "title": "dinner",
            "calorie": "2367",
            "date": "16/1/2020",
            "time": "14:5:46",
            "id": 3
        }]);   // hardcoding , rest is null

    useEffect(() => {
        // console.log('data',data);
        getMealData();
        console.log('data, ', data);
    }, []);

    const getMealData = async () => {
        const url = Paths.local +  'meal/?page=1&limit=10';
        const header = AuthUtil.getHeaders();
        //for the current user logged in viewing as /home
        //Todo userName is not getted by backend, so showing all the meals....
        const response = await Axios.get(url,{"headers":header}, {'userName': AuthUtil.getUser().userName });
        console.log('//////////', response);
        if(response.data.success) {
            const d = response.data.data;
            setData(d);
            console.log('????????????', data);
        }
        else {
            alert('failed attempt');
            const d = [{
                "title": "dinner",
                "calorie": "2367",
                "date": "16/1/2020",
                "time": "14:5:46",
                "id": 2
            },
                {
                    "title": "dinner",
                    "calorie": "2367",
                    "date": "16/1/2020",
                    "time": "14:5:46",
                    "id": 3
                }]
            setData(d);
        }
    };

    return (<Table
        dataSource={data}
        columns={columnSet.meal}
    />)
}

export default ViewAllMeals;


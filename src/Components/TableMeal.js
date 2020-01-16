import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Table} from "antd";
import AuthUtil from "../utils/AuthUtil";
import {Link} from "react-router-dom";

//get all meal by a username

function TableMeal() {
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
        const url = 'http://localhost:3000/meal/';
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        console.log('//////////', response);
        if(response.data.success) {
            // const d = response.data.data;
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
                }];
            setData(d);
            console.log('????????????', data);
        }
        else {
            // const d = {
            //     "title": "dinner",
            //     "calorie": "2367",
            //     "date": "16/1/2020",
            //     "time": "14:5:46",
            //     "id": 2
            // };
            // setData(d);
            // if(response.data.message === "no meals found") {
            //     // setData(null);
            // } else {
            //     alert(response.data.message);
            // }
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
export default TableMeal;
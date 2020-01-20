import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Table} from "antd";
import AuthUtil from "../utils/AuthUtil";
import {Link, withRouter} from "react-router-dom";

//get all meal by a username

//Todo first make for the user , on shown at /home
// Todo then make for admin to view any user

function TableMeal(props) {

    const userName = props.userName;
    console.log('<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>}}}}}}}}}}}}}}}', props);
    //TODO if passed userName then get the data for the that userName, else
    //else ...

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
                        (props.match.url === '/meals') ? null
                                :
                                    (<Link to={props.match.url + '/' + pk}>View</Link> )  //{`/meal/${pk}`}


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
        const url = 'http://localhost:3000/meal/?page=1&limit=10';
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

export default withRouter(TableMeal);
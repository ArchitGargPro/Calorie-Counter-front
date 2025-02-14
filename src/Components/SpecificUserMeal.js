import React, {useEffect, useState} from "react";
import Axios from "axios";
import {notification, Table} from "antd";
import AuthUtil from "../utils/AuthUtil";
import Paths from "../Constants/Path";

function SpecificUserMeal(props) {
    // console.log('specific user>>>>>>>>>>>>>', props.location.props.userName);
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
        ],
    };

    console.log(props);
    const [data, setData] = useState(null);

    useEffect(() => {
        // console.log('data',data);
        getMealData();
        console.log('data, ', data);
    }, []);

    const getMealData = async () => {
        const url = Paths.home + 'meal/of/'; // +  props.location.props.userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        if(response.data.success) {
            const d = response.data.data;
            setData(d);
        } else {
            if(response.data.message === "no meals found") {
                setData(null);
            } else {
                notification.open({
                    message: 'Error',
                    description:
                    response.data.message,
                });            }
        }
    };

    return (<Table
        dataSource={data}
        columns={columnSet.meal}
    />)
}
export default SpecificUserMeal;
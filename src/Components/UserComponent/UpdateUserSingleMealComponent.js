import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, Form, Input} from "antd";
import UpdateMealForm from "../Forms/UpdateMealForm";
import Paths from "../../Constants/Path";



function UpdateUserSingleMealComponent(props) {
    const mealId = props.match.params.mealId;
    const userName = AuthUtil.getUser().userName;
    // console.log(mealId, userName);

    const [data, setData] = useState({
        title : "",
        calorie : 0,
        date  : "dd/mm/yyyy",
        time : "hh:mm:ss",
        id: 0,
    });
    // console.log('>>>>>>>>>>>>>>data>>>>>>>>>>>>>>', data);

    const getSingleMealData = async () => {
        const url = Paths.home + 'user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        // console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            setData(response.data.data);
        } else {
            // alert(response.data.message);
            setData({
                title : "",
                calorie : 0,
                date  : "dd/mm/yyyy",
                time : "hh:mm:ss",
                id: 0,
            })
        }
    };
    //
    // useEffect(() => {
    //     // console.log('data',data);
    //     getSingleMealData();
    // }, []);


    return(
        <div>
            {data ?
                (<UpdateMealForm data={data}/>) :
                (<h1>Loading</h1>)
            }
        </div>);


}




export default UpdateUserSingleMealComponent;
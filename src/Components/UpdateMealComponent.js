import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, Form, Input} from "antd";
import UpdateMealForm from "./Forms/UpdateMealForm";
function UpdateMealComponent(props) {
    // const userName = props.match.params.userId;
    console.log('<<<<<<<<<<<<<<<<<<updateUSer>>>>>>>>>>>>>>',props.location.pathname.split('/')[2]);
    const userName = props.location.pathname.split('/')[2];

    const [data, setData] = useState({
        title : "",
        calorie : 0,
        date  : "dd/mm/yyyy",
        time : "hh:mm:ss",
        id: 0,
    });
    console.log('>>>>>>>>>>>>>>data>>>>>>>>>>>>>>', data);

    const getSingleMealData = async () => {
        const url = 'http://localhost:3000/user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
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




export default UpdateMealComponent;
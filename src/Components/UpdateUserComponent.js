import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, Form, Input, notification} from "antd";
import UpdateUserForm from "./Forms/UpdateUserForm";
import Paths from "../Constants/Path";

function UpdateUserComponent(props) {
    // console.log('<<<<<<<<<<<???>>>>>>>>>', props);
    const userName = props.match.params.userId;
    // console.log(userName);

    const [data, setData] = useState(null);
    // console.log('>>>>>>>>>>>>>>data>>>>>>>>>>>>>>', data);

    const getSingleUserData = async () => {
        const url =  Paths.home + 'user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        // console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            setData(response.data.data);
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });        }
    };

    useEffect(() => {
        // console.log('data',data);
        getSingleUserData();
    }, []);


    return(
        <div>
            {data ?
                (<UpdateUserForm data={data}/>) :
                (<h1>Loading</h1>)
            }
        </div>);


}




export default UpdateUserComponent;
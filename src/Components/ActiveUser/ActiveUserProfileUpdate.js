import React, {useEffect, useState} from "react";
import Axios from "axios";
import AuthUtil from "../../utils/AuthUtil";
import {Avatar, Button, Descriptions, Form, Input} from "antd";
import UpdateUserForm from "../Forms/UpdateUserForm";
import Paths from "../../Constants/Path";

function ActiveUserProfileUpdate(props) {
    const userName = AuthUtil.getUser().userName;
    const [data, setData] = useState(null);

    const getSingleUserData = async () => {
        const url =  Paths.local +  'user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        // console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            setData(response.data.data);
        } else {
            alert(response.data.message);
        }
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




export default ActiveUserProfileUpdate;
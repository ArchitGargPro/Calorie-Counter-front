import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, Form, Input} from "antd";
import UpdateUserForm from "./Forms/UpdateUserForm";

function UpdateUserComponent(props) {
    // const userName = props.match.params.userId;
    console.log('updateUSer>>>>>>>>>>>>>>',props);
    const userName = 'user';
    const [data, setData] = useState(null);
    console.log('>>>>>>>>>>>>>>data>>>>>>>>>>>>>>', data);

    const getSingleUserData = async () => {
        const url = 'http://192.168.0.146:3000/user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        console.log('>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
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




export default UpdateUserComponent;
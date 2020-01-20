import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, Form, Input} from "antd";
import UpdateMealForm from "./Forms/UpdateMealForm";
import Paths from "../Constants/Path";
function UpdateMealComponent(props) {
    const mealId = props.match.params.mealId;
    const userName = props.match.params.userId;
    console.log(mealId);

    const [data, setData] = useState('');

    const getSingleMealData = async () => {
        const url =  Paths.local +  'meal/';
        const header = AuthUtil.getHeaders();
        //for the current user logged in viewing as /home

        //Todo not accepting the id passed for getting one id
        const response = await Axios.get(url, {'params':{
                'id': mealId,
            }, "headers": header});
        console.log('//////////', response);
        if (response.data.success) {
            const d = response.data.data[0];
            setData(d);
            console.log('data',d);
            // console.log('????????????', data);
        } else {
            alert('failed attempt')
        }
    };

    useEffect(() => {
        // console.log('data',data);
        getSingleMealData();
    }, []);


    return(
        <div>
            {data ?
                (<UpdateMealForm data={data} mealId={mealId}/>) :
                (<h1>Loading</h1>)
            }
        </div>);


}




export default UpdateMealComponent;
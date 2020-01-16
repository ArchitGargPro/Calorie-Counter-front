

//get meal data based on the pk of url and show... + restrict a user from seeing other pk meal from other user
import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions} from 'antd';
import {Link} from "react-router-dom";

function ViewMealComponent(props){
    const userName = props.match.params.userId;

    const [data, setData] = useState(  {
        title : "",
        calorie : 0,
        date  : "dd/mm/yyyy",
        time : "hh:mm:ss",
        id: 0,
    });

    const getSingleMealData = async () => {
        const url = 'http://localhost:3000/user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        // console.log('response>>>>>>>>>>>>>>>', response);
        if(response.data.success) {
            setData(response.data.data);
            // console.log('worked>>>>>>>>>>>>>>>>', data)
        } else {
            alert(response.data.message);
        }
    };

    // useEffect(() => {
    //     // console.log('data',data);
    //     getSingleMealData();
    // }, []);


    // d: 3, userName: "admin2", name: "Admin2", access: 3, calorie: 2000}
    return(
        <div>
            {data ?
                (<Descriptions title='Meal Details'>
                    <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
                    <Descriptions.Item label="Calorie">{data.calorie}</Descriptions.Item>
                    <Descriptions.Item label="Date">{data.date}</Descriptions.Item>
                    <Descriptions.Item label="Time">{data.time}</Descriptions.Item>
                </Descriptions>) :
                (<h1>Loading</h1>)}

            <span>
                        <Button type="primary">
                            <Link to={props.match.url + '/update'}>
                                Update
                            </Link>
                        </Button>
                &nbsp;&nbsp;&nbsp;
                </span>
        </div>

    );
    // let {userId } = useParams();  //get the params pass which is username;
    //on componentMount   call   getSpecificMeal by id
    //Todo show this specific meal based on the id received
}
export default ViewMealComponent;
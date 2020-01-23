
//TOdo
// if(AuthUtil.getUser().access == 1) { //user
//     //then send AuthUtil.getUser.userName to the backend too ,
//
// }
// else if { //admin
//     //then send the username for which admin is seeing the meal....
// }


//get meal data based on the pk of url and show... + restrict a user from seeing other pk meal from other user
import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, notification, Popconfirm} from 'antd';
import {Link, withRouter} from "react-router-dom";
import Paths from "../Constants/Path";

function ViewMealComponent(props){
    // console.log('<<<<<<<<<<<params>>>>>>>>>>>', props);
    const mealId = props.match.params.mealId;
    // console.log(mealId);

    const [data, setData] = useState(  {
        title : "",
        calorie : 0,
        date  : "dd/mm/yyyy",
        time : "hh:mm:ss",
        id: 0,
    });

    const getSingleMealData = async () => {
        const url =  Paths.home +  'meal/';
        const header = AuthUtil.getHeaders();
        //for the current user logged in viewing as /home

        //Todo not accepting the id passed for getting one id
        const response = await Axios.get(url, {'params':{
            'id': mealId,
                // 'userName': AuthUtil.getUser().userName,
        }, "headers": header});
        // console.log('//////////', response);
        if (response.data.success) {
            const d = response.data.data[0];
            setData(d);
            // console.log('????????????', data);
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });        }
    }
            useEffect(() => {
                // console.log('data',data);
                getSingleMealData();
            }, []);





    const deleteMeal = async() =>{
        const url = Paths.home + 'meal/remove/' + mealId;
        const header = AuthUtil.getHeaders();
        const response = await Axios.delete(url, {"headers": header});
        // console.log('response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            console.log('sucess');
            (AuthUtil.getUser().access === 3) ?
            props.history.push('/home')
                : props.history.push('/me/meal')
            // console.log('worked>>>>>>>>>>>>>>>>', data)
        } else {
            notification.open({
                message: 'Error',
                description:
                response.data.message,
            });        }
    };


            // d: 3, userName: "admin2", name: "Admin2", access: 3, calorie: 2000}
            return (
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
                        <Popconfirm title="Sure to Delete?" onConfirm={deleteMeal}>
                                <Button type="primary">
                                Delete
                                </Button>
                        </Popconfirm>
                </span>
                </div>

            );
            // let {userId } = useParams();  //get the params pass which is username;
            //on componentMount   call   getSpecificMeal by id
            //Todo show this specific meal based on the id received

    };

export default ViewMealComponent;
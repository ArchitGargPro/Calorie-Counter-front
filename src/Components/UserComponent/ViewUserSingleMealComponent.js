
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
import Axios from "axios";
import AuthUtil from "../../utils/AuthUtil";
import {Avatar, Button, Descriptions} from 'antd';
import {Link, withRouter} from "react-router-dom";
import Paths from "../../Constants/Path";


function ViewUserSingleMealComponent(props){
    console.log('<<<<<<<<<<<params>>>>>>>>>>>', props);
    const mealId = props.match.params.mealId;
    console.log(mealId);

    const [data, setData] = useState(  {
        title : "",
        calorie : 0,
        date  : "dd/mm/yyyy",
        time : "hh:mm:ss",
        id: 0,
    });

    const getSingleMealData = async () => {
        const url =  Paths.local + 'meal/';
        const header = AuthUtil.getHeaders();
        //for the current user logged in viewing as /home

        //Todo not accepting the id passed for getting one id
        const response = await Axios.get(url, {"headers": header,
            'id': mealId,
            'userName': AuthUtil.getUser().userName,

        });
        console.log('//////////', response);
        if (response.data.success) {
            const d = response.data.data;
            setData(d);
            console.log('????????????', data);
        } else {
            alert('failed attempt')
        }
    }
    useEffect(() => {
        // console.log('data',data);
        getSingleMealData();
    }, []);


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
                </span>
        </div>

    );
    // let {userId } = useParams();  //get the params pass which is username;
    //on componentMount   call   getSpecificMeal by id
    //Todo show this specific meal based on the id received

};

export default ViewUserSingleMealComponent;
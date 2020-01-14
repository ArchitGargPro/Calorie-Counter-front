
import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions} from 'antd';
import {Link} from "react-router-dom";

function ViewUserComponent(props){
    const userName = props.match.params.userId;
    console.log('params>>>>>>>>>>>>>>>', props);
    const [data, setData] = useState(null);

    const getSingleUserData = async () => {
        const url = 'http://192.168.0.146:3000/user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        console.log('response>>>>>>>>>>>>>>>', response);
        if(response.data.success) {
            setData(response.data.data);
            console.log('worked>>>>>>>>>>>>>>>>', data)
        } else {
            alert(response.data.message);
        }
    };

    useEffect(() => {
        // console.log('data',data);
        getSingleUserData();
    }, []);


    // d: 3, userName: "admin2", name: "Admin2", access: 3, calorie: 2000}
    return(
        <div>
        <Avatar size="large" icon="user" />
            {data ?
        (<Descriptions title={data.userName}>
              <Descriptions.Item label="UserName">{data.userName}</Descriptions.Item>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Access">{data.access}</Descriptions.Item>
                <Descriptions.Item label="Calorie">{data.calorie}</Descriptions.Item>
        </Descriptions>) :
                (<h1>Loading</h1>)}

                <span>
                        <Button type="primary">
                            <Link to={props.match.url + '/update'}>
                                Update
                            </Link>
                        </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary">
                        <Link to={{pathname: props.match.url + '/meals',
                        props:{
                            userName
                        } }} >Meals</Link>
                    </Button>
                </span>
        </div>

    );
    // let {userId } = useParams();  //get the params pass which is username;
    //on componentMount   call   getSpecificMeal by id
    //Todo show this specific meal based on the id received
}
export default ViewUserComponent;
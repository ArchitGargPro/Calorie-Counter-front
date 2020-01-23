
import React, {useEffect, useState} from "react";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {Avatar, Button, Descriptions, notification, Popconfirm} from 'antd';
import {Link} from "react-router-dom";
import Paths from "../Constants/Path";

function ViewUserComponent(props) {
    console.log('<<<<<<<<<<<<<ViewUserComponent', props);
    const userName = props.match.params.userId;
    const [data, setData] = useState(null);

    const getSingleUserData = async () => {
        const url = Paths.home + 'user/' + userName;
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers": header});
        // console.log('response>>>>>>>>>>>>>>>', response);
        if (response.data.success) {
            setData(response.data.data);
            // console.log('worked>>>>>>>>>>>>>>>>', data)
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



    const deleteUser = async() =>{
      const url = Paths.home + 'user/remove/' + userName;
            const header = AuthUtil.getHeaders();
            const response = await Axios.delete(url, {"headers": header});
            // console.log('response>>>>>>>>>>>>>>>', response);
            if (response.data.success) {
                console.log('sucess');
                props.history.push('/home')
                // console.log('worked>>>>>>>>>>>>>>>>', data)
            } else {
                notification.open({
                    message: 'Error',
                    description:
                    response.data.message,
                });            }
    };




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
                        {
                            (AuthUtil.getUser().access === 2) ? null :

                                <Button type="primary">
                                        <Link to={props.match.url + '/meal'}>
                                        Meals
                                    </Link>
                                </Button>
                        }

                    &nbsp;&nbsp;&nbsp;

                    {
                        (data) ? (
                        ((AuthUtil.getUser().access === 2 && data.access === 1) || AuthUtil.getUser().access === 3)
                        ?
                        <Popconfirm title="Sure to Delete?" onConfirm={deleteUser}>
                        <Button type="primary">
                        Delete
                        {console.log('@@@@@@@@@@@@', data)
                        }
                        </Button>

                        </Popconfirm>
                        : null
                        ): null
                    }
                </span>
        </div>

    );
    // let {userId } = useParams();  //get the params pass which is username;
    //on componentMount   call   getSpecificMeal by id
    //Todo show this specific meal based on the id received
}
export default ViewUserComponent;
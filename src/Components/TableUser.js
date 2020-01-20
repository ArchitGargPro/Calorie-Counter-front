import React, { useEffect, useState} from "react";
import {Tag, Table, Pagination} from "antd";
import {EAccess, Accesses} from "../Constants/EAccess";
import AuthUtil from "../utils/AuthUtil";
import Axios from "axios";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Paths from "../Constants/Path";
import ActionTypes from "../store/actionTypes";


function TableUser(props) {

    // let data = props.userData;

    const columnSet ={
        user: [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Username',
                dataIndex: 'userName',
            },
            // {
            //     title: 'Password',
            //     dataIndex: 'password',
            //     editable: true,
            //     inputType: 'string'
            // },
            {
                title: 'Access',
                dataIndex: 'access',
                editable: true,
                inputType: 'number',
                render: (access) => {
                    let color;
                    let accesses;
                    switch (access) {
                        case EAccess.USER : color = 'blue';
                            accesses = Accesses.USER;
                            break;
                        case EAccess.MANAGER: color = 'green';
                            accesses = Accesses.MANAGER;
                            break;
                        case EAccess.ADMIN: color = 'volcano';
                            accesses = Accesses.ADMIN;
                            break;
                        default : color='black';
                            accesses = Accesses.ANONYMOUS;
                    }
                    return (
                        <Tag color={color} key={access}>
                            {accesses}
                        </Tag>
                    );
                }
            },
            {
                title: 'Expected Calories(Per Day)',
                dataIndex: 'calorie',
                editable: true,
                inputType: 'number'
            },
            {
                title: '',
                dataIndex: '',


                render: (record) => {
                    const pk = record.userName;
                    return (
                        <Link to={`/user/${pk}`}>View</Link>
                    );
                }
            },
        ],
    };

    // const [data, setData] = useState(null);


    useEffect(() => {
        getUserData();
    }, []);


    const getUserData = async () => {
        const url =  Paths.local + 'user?page=1&limit=10';
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        console.log('<<<<<<<<<<<<<<<<<<respone>>>>>>>>>>>>>>>', response);
        if(response.data.success ) {
            const d = response.data.data;
            console.log('d',d);
            props.updateUserDataAction(d);
        } else {
            alert(response.data.message);
        }
    };

    console.log('redux ',props.userData);
    return (
        <div>
            <Table
                dataSource={props.userData}
                columns={columnSet.user}
                pagination={{
                    position: 'bottom',
                    defaultCurrent: 1,
                    pageSize: 4,
                    total: 100,
                    onChange: (page: number) => {
                        console.log(page);
                    }
                }}
            />
        </div>
    );
}



const mapStateToProps = state => ({
    userData : state.userData
});

const mapDispatchToProps = dispatch => ({
    updateUserDataAction: userData => dispatch({
        type: ActionTypes.SET_USER_DATA,
        payload: {
            userData
        }
    })
});



export default connect(mapStateToProps, mapDispatchToProps)(TableUser);

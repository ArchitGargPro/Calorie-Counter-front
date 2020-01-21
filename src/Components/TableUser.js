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
    const [totalPageLength, setTotalPageLength] = useState(0);
    const [pageNo, setPageNo] = useState(1);



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



    useEffect(() => {
        getUserData();
    }, [pageNo]);






    const getUserData = async () => {
        let url =  Paths.home + 'user?limit=10';
        const header = AuthUtil.getHeaders();
        let page = '&page=' + pageNo;
        console.log(pageNo);

        url = url + page;
        console.log('url>>>>>>>>>>>>>>>>>>>>>>>', url);
        const response = await Axios.get(url, {"headers":header});


        console.log('<<<<<<<<<<<<<<<<<<respone>>>>>>>>>>>>>>>', response);
        if(response.data.success ) {
            const d = response.data.data;
            console.log('d',d);
            props.updateUserDataAction(d);
            setTotalPageLength(response.data.dataLength);
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
                    pageSize: 10,
                    total: totalPageLength,
                    onChange: (page: number) => {
                       setPageNo(page);
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

import {Button, PageHeader, Popconfirm} from "antd";
import React from "react";
import WrappedHorizontalLoginForm from "../Forms/WrappedNormalLoginForm";
import AuthUtil from "../../utils/AuthUtil";
import {ELogInStatus} from "../../Constants/EAccess";
import ActionTypes from "../../store/actionTypes";
import {connect} from "react-redux";
import {Link, NavLink, Redirect} from "react-router-dom";

function CalorieHeader(props){
    // const onLoginClickHandle = () =>{
    //     props.setLoginStatusAction(ELogInStatus.ATTEMPTED);
    //     // props.history.push('/login');
    //     return (
    //         <Redirect to='/login'/>
    //     )
    //     // TODO change route to /login
    // };


    const logOut = () => {
        AuthUtil.clearJWTToken();
        props.logOutAction();
        props.history.push('/');
        // TODO change route to /
    };



    const loginControl = () => {
        switch(props.loginStatus) {
            case ELogInStatus.LOGGEDIN : return (
                <Popconfirm title="Sure to Log Out?" onConfirm={logOut}>
                    <Link to={`/user/${AuthUtil.getUser().userName}`}><h3>Welcome, {AuthUtil.getUser().name}</h3></Link>
                    <a key="1" type="primary">
                        LogOut
                    </a>
                </Popconfirm>
            );
            case ELogInStatus.ATTEMPTED : return (null);
            default : return (
                <span>
                    <Button key="1" type="primary" >
                    <NavLink to='/login'>LogIn</NavLink>
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button key="2" type="primary" >
                    <NavLink to='/signup'>Sign Up </NavLink>
                </Button>
                </span>
            );
        }
    };

    return(
        <div>
        <PageHeader
            title="Calorie Counter"
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            extra={loginControl()}>
        </PageHeader>
        </div>
    );
}

const mapStateToProps = state => ({
    loginStatus: state.loginStatus,
});

const mapDispatchToProps = dispatch => ({
    setLoginStatusAction: loginStatus => dispatch({
        type: ActionTypes.SET_LOGIN_STATUS,
        payload: {
            loginStatus
        }
    }),
    logOutAction: () => dispatch({
        type: ActionTypes.RESET
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieHeader);

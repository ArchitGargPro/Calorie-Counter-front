import {Button, PageHeader, Popconfirm} from "antd";
import React from "react";
import WrappedHorizontalLoginForm from "../Forms/WrappedHorizontalLoginForm";
import AuthUtil from "../../utils/AuthUtil";
import {ELogInStatus} from "../../Constants/EAccess";
import ActionTypes from "../../store/actionTypes";
import {connect} from "react-redux";


function CalorieHeader(props){
    const onLoginClickHandle = () =>{
        props.setLoginStatusAction(ELogInStatus.ATTEMPTED);
    };

    const logOut = () => {
        AuthUtil.clearJWTToken();
        props.logOutAction();
    };

    const loginControl = () => {
        switch(props.loginStatus) {
            case ELogInStatus.LOGGEDIN : return (
                <Popconfirm title="Sure to Log Out?" onConfirm={logOut}>
                    <h3>Welcome, {AuthUtil.getUser().name}</h3>
                    <a key="1" type="primary">
                        LogOut
                    </a>
                </Popconfirm>
            );
            case ELogInStatus.ATTEMPTED : return (
                <WrappedHorizontalLoginForm/>
            );
            default : return (
                <Button key="1" type="primary" onClick={onLoginClickHandle}>
                    LogIn
                </Button>
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

        {props.children}
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

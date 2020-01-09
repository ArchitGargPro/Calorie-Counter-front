import {Button, PageHeader} from "antd";
import React from "react";
import WrappedHorizontalLoginForm from "./WrappedHorizontalLoginForm";
import AuthUtil from "../utils/AuthUtil";
import {ELogInStatus} from "../EAccess";
import ActionTypes from "../store/actionTypes";
import {connect} from "react-redux";


function CalorieHeader(props){
    const onLoginClickHandle = () =>{
        props.setLoginStatusAction(ELogInStatus.ATTEMPTED);
    };

    const loginControl = () => {
        switch(props.loginStatus) {
            case ELogInStatus.LOGGEDIN : return (
                <a key="1" type="primary">
                    Welcome, {AuthUtil.getUser().name}
                </a>
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
        <PageHeader
            title="Calorie Counter"
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            extra={loginControl()}>
        </PageHeader>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieHeader);

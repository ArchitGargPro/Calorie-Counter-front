import {Button, PageHeader} from "antd";
import React, {useEffect, useState} from "react";
import WrappedHorizontalLoginForm from "./WrappedHorizontalLoginForm";
import AuthUtil from "../utils/AuthUtil";
import {ELogInStatus} from "../EAccess";


function CalorieHeader(props){
    const [isLoggedIn, setIsLoggedIn] = useState(ELogInStatus.UNATTEMPTED);

    const onLoginClickHandle = () =>{
        setIsLoggedIn(ELogInStatus.ATTEMPTED);
    };

    useEffect(() => {
        if(isLoggedIn === ELogInStatus.LOGGEDIN){
            props.setLoginStatus(true);
            console.log('setting login status', isLoggedIn);
        } else {
            props.setLoginStatus(false);
        }
    }, [isLoggedIn]);

    const loginControl = () => {
        if (isLoggedIn === ELogInStatus.LOGGEDIN) {
            return (
                <a key="1" type="primary" >
                    Welcome, {AuthUtil.getUser().name}
                </a>
            );
        } else if (isLoggedIn === ELogInStatus.ATTEMPTED) {
            return (
                <WrappedHorizontalLoginForm logInStatus={setIsLoggedIn}/>
            );
        } else {
            return (
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
            extra={loginControl()}
        >
        </PageHeader>
    );

}

export default CalorieHeader;
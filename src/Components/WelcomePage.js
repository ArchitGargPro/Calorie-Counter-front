import {Layout} from "antd";
import React from "react";
import AuthUtil from "../utils/AuthUtil";
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom';
import {ELogInStatus} from "../Constants/EAccess";

function WelcomePage (props) {
    if(props.loginStatus === ELogInStatus.LOGGEDIN){
        console.log('inside>>>>>>>>>>>>>>>>>>>>>');
        if(AuthUtil.getUser().access === 1){
            return (<Redirect {...props} to="/me/meal" />);
        }
        else{
            return (<Redirect {...props} to="/home" />);
        }

    }
    else {
        return (
            <Layout style={{padding: '20px', textAlign: 'center'}}>
                <h1>Welcome To Calorie Counter</h1>
            </Layout>
        )
    }
}



const mapStateTpProps = state =>({
    loginStatus: state.loginStatus,
});

export default connect(mapStateTpProps, null)(withRouter(WelcomePage));
// export default ;

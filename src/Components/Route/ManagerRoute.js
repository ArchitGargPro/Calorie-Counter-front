import {EAccess, ELogInStatus} from "../../Constants/EAccess";
import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AuthUtil from "../../utils/AuthUtil";

function ManagerRoute(props){

    const {component, ...rest} = props;

    const renderFunction =() => {
        if (props.loginStatus === ELogInStatus.LOGGEDIN) {
            return(
                (AuthUtil.getUser().access === EAccess.MANAGER) ? (
                    <Route {...rest} to='/home' component={component} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/not-authorised",
                            // state: { from: location }
                        }}
                    />
                )
            );

        }else{
            return (<Redirect {...rest} to="/login" />);
        }
    }
    return( renderFunction());

};


const mapStateTpProps = state =>({
    loginStatus: state.loginStatus,
});

export default connect(mapStateTpProps)(withRouter(ManagerRoute));


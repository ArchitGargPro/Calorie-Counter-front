import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {ELogInStatus} from "../Constants/EAccess";



function PrivateRoute(props) {
    const {component} = props.component;
    console.log('oajfjiosafoiha;sdf',props);
    const {loggedIn} = props.loginStatus;
    const render = () => {
        if (loggedIn === ELogInStatus.LOGGEDIN) {
            return (<component {...props} />);
        } else if (loggedIn === ELogInStatus.UNATTEMPTED) {
            return(
                <Redirect to='/'/>
            );
        } else if (loggedIn === ELogInStatus.ATTEMPTED) {
            return (<Redirect to='/login'/>);
        }
    };

    return (<Route {...props} render={render}/>);
}

const mapStateToProps = (state) => ({
    loginStatus: state.loginStatus,

});

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);


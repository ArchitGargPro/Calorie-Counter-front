import {EAccess, ELogInStatus} from "../../Constants/EAccess";
import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AuthUtil from "../../utils/AuthUtil";

function PrivateRoute(props){
// console.log('<<<<<<<<<<adminRoute>>>>>>>>>>>', props);
    const {component, ...rest} = props;
    // console.log('addasdas', props)
    const accessArray = props.accessArray;
    // console.log('<<<<<<<<<<<<<>>>>>>>>>>>>>', ...accessArray);
    // console.log('EloginStatus', AuthUtil.getUser().access);
    // console.log(AuthUtil.getUser().access === accessArray[1]);

    const renderFunction =() => {
        // console.log('aaaaaaaaaaaaa', props);

        // if(accessArray[0] === 0){
        //     if(props.loginStatus !== ELogInStatus.LOGGEDIN){
        //         return(
        //             <Route {...rest}  component={component} />
        //         );
        //
        //     }else{
        //        return( <Redirect
        //             to={{
        //                 pathname: "/not-authorised",
        //                 // state: { from: location }
        //             }}
        //         />);
        //     }
        //
        // }



//private route here
        if (props.loginStatus === ELogInStatus.LOGGEDIN) {
            return(
                (AuthUtil.getUser().access === accessArray[0] || AuthUtil.getUser().access === accessArray[1] || AuthUtil.getUser().access === accessArray[2]) ?
                    (
                     <Route {...rest}  component={component} />
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
    };
    return( renderFunction());

};


const mapStateTpProps = state =>({
    loginStatus: state.loginStatus,
});

export default connect(mapStateTpProps)(withRouter(PrivateRoute));


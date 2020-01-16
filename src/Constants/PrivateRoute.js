import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";
import {EAccess, ELogInStatus} from "./EAccess";


function UserRoute(props){
    const {children, ...rest} = props;

    const renderFunction =() => {
        if (props.loginStatus === ELogInStatus.LOGGEDIN) {
            return(<Route
                {...rest}
                render={({ location }) =>
                    props.access === EAccess.USER ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/not-authorised",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />);

        }else{
            return (<Redirect {...rest} to='{{
                                pathname: "/login",
                                state: { from: location }
                            }}>)
        }
    }

    return(()=>renderFunction());

};


function AdminRoute(props){
    const {children, ...rest} = props;

    const renderFunction =() => {
        if (props.loginStatus === ELogInStatus.LOGGEDIN) {
            return(<Route
                {...rest}
                render={({ location }) =>
                    props.access === EAccess.USER ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/not-authorised",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />);

        }else{
                return (<Redirect {...rest} to='{{
                pathname: "/login",
                state: { from: location }
            }}>)
                }

                };

                return(()=>renderFunction());

                };


                function ManagerRoute(props){
                    const {children, ...rest} = props;

                    const renderFunction =() => {
                    if (props.loginStatus === ELogInStatus.LOGGEDIN) {
                    return(<Route
                    {...rest}
                    render={({ location }) =>
                        props.access === EAccess.USER ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/not-authorised",
                                    state: { from: location }
                                }}
                            />
                        )
                    }
                    />);

                }else{
                    return (<Redirect {...rest} to='{{
                                pathname: "/login",
                                state: { from: location }
                            }}>);
                    }
        }

    return(()=>renderFunction());
};


const mapStateToProps = (state) => {
    return {
        currentUser:  state.currentUser,
        loggedIn: state.loggedIn,
        twofaModal: state.twofaModal,
        toggleNavBarOpen: state.toggleNavBarOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loggedInUserDetails:  () => UserAction.loggedInUserDetails()(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);





//
// ELogInStatus.ATTEMPTED
// ELogInStatus.UNATTEMPTED
// /login Route
// /signup Route
// /
//
// ELogInStatus.LOGGEDIN && EAccess.USER && AuthUtil.getUser().name == userId
// /home => list of this user meals    meal USer
// && AuthUtil.getUser().name == userId
// /user/me   => where AuthUtil.getUser().name == userId
// /user/me/meal/:mealId
// /user/me/meal/:mealId/update
// /user/me/meal/add
//
//
// ELogInStatus.LOGGEDIN && EAccess.MANAGER
// /user  => list of all users
// /user/:userId
// /user/add
// /user/:userId/update
// /user/:userId/delete
//
//     ELogInStatus.LOGGEDIN && EAccess.ADMIN
// /user  => list of all users
// /user/:userId
// /user/add
// /user/:userId/update
// /user/:userId/meals
// /user/:userId/meal/:mealId
// /user/:userId/meal/add

//
//
// where AuthUtil.getUser().name == userId
// neither admin, not manager not user can delete the user , so delete button is hidden.
//
//
//     loginStatus : ELogInStatus.UNATTEMPTED
// const ELogInStatus = {
//     UNATTEMPTED : 'UNATTEMPTED',
//     ATTEMPTED: 'ATTEMPTED',
//     LOGGEDIN : 'LOGGEDIN',
// };
//
//
// access: EAccess.ANONYMOUS
// const Accesses = {
//     ANONYMOUS: 'ANONYMOUS',
//     USER: 'USER',
//     MANAGER:'MANAGER',
//     ADMIN: 'ADMIN',
// };
//
//
//
// history:
//     action: "POP"
// block: ƒ block(prompt)
// createHref: ƒ createHref(location)
// go: ƒ go(n)
// goBack: ƒ goBack()
// goForward: ƒ goForward()
// length: 17
// listen: ƒ listen(listener)
// location: {pathname: "/", search: "", hash: "", state: undefined}
// push: ƒ push(path, state)
// replace: ƒ replace(path, state)
// __proto__: Object
// location:
//     hash: ""
// pathname: "/"
// search: ""
// state: undefined
// __proto__: Object
// match:
//     isExact: true
// params: {}
// path: "/"
// url: "/"
// __proto__: Object
// staticContext: undefined
// __proto__: Object
//



//
//
// export const initialState = {
//     loginStatus : ELogInStatus.UNATTEMPTED,
//     // currentTable : ETables.MEAL,
//     // userAlert : 1,
//     // registrationStatus : ERegistrationStatus.DEFAULT,
//     access: EAccess.ANONYMOUS
// };







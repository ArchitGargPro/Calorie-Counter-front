import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CalorieHeader from "./Components/Containers/CalorieHeader";
import HomeContainer from "./Components/Containers/HomeContainer";
import WelcomePage from "./Components/WelcomePage";
import LogInComponent from "./Components/Containers/LogInComponent";
import SignUpComponent from "./Components/Containers/SignUpComponent";
import ViewUserComponent from "./Components/ViewUserComponent";
import UpdateUserComponent from "./Components/UpdateUserComponent";
import NotAuthorised from "./Components/NotAuthorised";
import AddUserFormComponent from "./Components/Forms/AddUserFormComponent";
import AddMealFormComponent from "./Components/Forms/AddMealFormComponent";
import PrivateRoute from "./Components/Route/PrivateRoute";
import ViewMealComponent from "./Components/ViewMealComponent";
import UpdateMealComponent from "./Components/UpdateMealComponent";
import ActiveUserProfileView from "./Components/ActiveUser/ActiveUserProfileView";
import ActiveUserProfileUpdate from "./Components/ActiveUser/ActiveUserProfileUpdate";
// import CreateUserMealComponent from "./Components/UserComponent/CreateUserMealComponent";
// import ViewUserSingleMealComponent from "./Components/UserComponent/ViewUserSingleMealComponent";
// import UpdateUserSingleMealComponent from "./Components/UserComponent/UpdateUserSingleMealComponent";
import MealComponent from "./Components/MealsComponent/MealComponent";

//Todo {
// in /meal, /meal/id, and /meal/update,
//     i have to check for the admin and user,
//     and respective give access and send userName instead of AuthUtil.getUser().userName to backend
//
// }



function App(){
    return(
        <BrowserRouter>
            <Route path='/' component={CalorieHeader}/>
            <Switch>
                <Route  exact path='/' component={WelcomePage}/>
                <Route accessArray={[0]} exact path='/login' component={LogInComponent}/>
                <Route accessArray={[0]} exact path='/signup' component={SignUpComponent}/>

                {/* shows user data else meal data if a plain user, using TableMeal and TableUser */}
                <PrivateRoute exact accessArray={[2, 3]} path='/home' component={HomeContainer}/>

                <PrivateRoute exact accessArray={[2,3]} path='/new/user' component={AddUserFormComponent} />
                <PrivateRoute exact accessArray={[2,3]} path='/user/:userId' component={ViewUserComponent}/>
                <PrivateRoute exact accessArray={[2,3]} path='/user/:userId/meal/new' component={AddMealFormComponent}/>
                <PrivateRoute exact accessArray={[2,3]} path='/user/:userId/update' component={UpdateUserComponent} />
                <PrivateRoute exact accessArray={[3]} path='/user/:userId/meal/:mealId' component={ViewMealComponent} />
                <PrivateRoute exact accessArray={[3]} path='/user/:userId/meal/:mealId/update' component={UpdateMealComponent}/>

                <PrivateRoute exact accessArray={[1,2,3]} path='/me' component={ActiveUserProfileView} />
                <PrivateRoute exact accessArray={[1,2,3]} path='/me/update' component={ActiveUserProfileUpdate} />
                <PrivateRoute exact accessArray={[3]} path='/meals' component={MealComponent}/>
                <PrivateRoute exact accessArray={[3]} path='/user/:userId/meal' component={MealComponent} />



                <PrivateRoute exact accessArray={[1]} path='/me/new/meal' component={AddMealFormComponent} />
                <PrivateRoute exact accessArray={[1]} path='/me/meal/:mealId' component={ViewMealComponent} />
                <PrivateRoute exact accessArray={[1]} path='/me/meal/:mealId/update' component={UpdateMealComponent} />
                <PrivateRoute exact accessArray={[1]} path='/me/meal' component={MealComponent} />

                <PrivateRoute exact accessArray={[1,2,3]} path='/not-authorised' component={NotAuthorised}/>
                {/*<Route exact path='/user/:userId/meals' component={SpecificUserMeal} />*/}

            </Switch>

        </BrowserRouter>
    )
}

export default App;

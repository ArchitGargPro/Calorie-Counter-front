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
import TableMeal from "./Components/TableMeal";
import SpecificUserMeal from "./Components/SpecificUserMeal";
import NotAuthorised from "./Components/NotAuthorised";
import AddUserFormComponent from "./Components/Forms/AddUserFormComponent";
import AddMealFormComponent from "./Components/Forms/AddMealFormComponent";
import UserRoute from "./Components/Route/UserRoute";
import ManagerRoute from "./Components/Route/ManagerRoute";
import AdminRoute from "./Components/Route/AdminRoute";
import ViewMealComponent from "./Components/ViewMealComponent";
import UpdateMealComponent from "./Components/UpdateMealComponent";

function App(){
    return(
        <BrowserRouter>
            <Route path='/' component={CalorieHeader}/>
            <Switch>
                <Route exact path='/' component={WelcomePage}/>
                <Route exact path='/login' component={LogInComponent}/>
                <Route exact path='/signup' component={SignUpComponent}/>


                {/* shows user data else meal data if a plain user, using TableMeal and TableUser */}
                <Route exact accessArray={[1, 3]} path='/home' component={HomeContainer}/>

                {/* for admin to view all meals of a user */}
                <Route exact path='/user/:userId/meal' component={TableMeal} />

                <Route exact path='/user/:userId' component={ViewUserComponent}/>
                <Route exact path='/user/:userId/update' component={UpdateUserComponent} />
                <Route exact path='/user/meal' component={TableMeal} />
                <Route exact path='/not-authorised' component={NotAuthorised}/>
                <Route exact path='/user/:userId/meals' component={SpecificUserMeal} />

                <Route exact path='/new/meal' component={AddMealFormComponent}/>
                <Route exact path='/new/user' component={AddUserFormComponent} />
                <Route exact path='/meal/:mealId/' component={ViewMealComponent}/>
                <Route exact path='/meal/:mealId/update' component={UpdateMealComponent}/>
                {/*<Route exact path='/user/:userId/' component={}/>*/}
                {/*<Route exact path='/user/:userId/' component={}/>*/}


                {/*/user/:userId*/}
                {/*/user/add*/}
                {/*/user/:userId/update*/}
                {/*/user/:userId/meals*/}
                {/*/user/:userId/meal/:mealId*/}
                {/*/user/:userId/meal/add*/}

                {/*<Route exact path='/user/:userId/' component={}/>*/}
                {/* /meal */}
                {/* /meal/:mealid */}
                {/*<Route exact path='user/:userId/meal/' component={}/>*/}
                {/*<Route exact path='meal/:mealId/update' component={} />*/}



            </Switch>

        </BrowserRouter>
    )
}

export default App;

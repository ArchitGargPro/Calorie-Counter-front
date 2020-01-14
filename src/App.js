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

function App(){
    return(
        <BrowserRouter>
            <Route path='/' component={CalorieHeader}/>
            <Switch>
                <Route exact path='/' component={WelcomePage}/>
                <Route exact path='/login' component={LogInComponent}/>
                <Route exact path='/signup' component={SignUpComponent}/>
                <Route exact path='/home' component={HomeContainer}/>
                <Route exact path='/user/:userId' component={ViewUserComponent}/>
                <Route exact path='/user/:userId/update' component={UpdateUserComponent} />
                <Route exact path='/meal' component={TableMeal} />

                <Route exact path='/user/:userId/meals' component={SpecificUserMeal} />
                {/*<Route exact path='/user/:userId/' component={}/>*/}
                {/*<Route exact path='/user/:userId/update/' component={} />*/}
                {/* /meal */}
                {/* /meal/:mealid */}
                {/*<Route exact path='user/:userId/meal/' component={}/>*/}
                {/*<Route exact path='meal/:mealId/update' component={} />*/}
            </Switch>

        </BrowserRouter>
    )
}

export default App;

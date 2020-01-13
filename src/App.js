import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter, Route} from "react-router-dom";
import CalorieHeader from "./Components/Containers/CalorieHeader";
import HomeContainer from "./Components/Containers/HomeContainer";

function App(){
    return(
        <BrowserRouter>
            <Route path='/'  component={CalorieHeader}/>
            <Route path='/home' component={HomeContainer} />
        </BrowserRouter>
    )
}

export default App;

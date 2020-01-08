import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import CalorieHeader from "./Components/PageHeader";
import CalorieSideBar from "./Components/User/SideBar";
import ContentContainer from "./Components/User/ContentContainer";
import AuthUtil from "./utils/AuthUtil";
import {ETables} from "./EAccess";

function App(){

    const [loginStatus, setLoginStatus] = useState(!!AuthUtil.getUser());
    const [currentTable, setCurrentTable] = useState(ETables.MEAL);
    const [userAlert, newUserAlert] = useState(null);

    return(
        <div>
            <CalorieHeader setLoginStatus={setLoginStatus}/>
            <Layout>
                <CalorieSideBar loginStatus={loginStatus}/>
                <ContentContainer loginStatus={loginStatus} userAlert={userAlert} newUserAlert={newUserAlert} currentTable={currentTable} setCurrentTable={setCurrentTable}/>
            </Layout>
        </div>
    );
}

export default App;

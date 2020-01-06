import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import CalorieHeader from "./Components/PageHeader";
import CalorieSideBar from "./Components/User/SideBar";
import ContentContainer from "./Components/User/ContentContainer";
import AuthUtil from "./utils/AuthUtil";

function App(){

    const [loginStatus, setLoginStatus] = useState(!!AuthUtil.getUser());

    return(
        <div>
            <CalorieHeader setLoginStatus={setLoginStatus}/>
            <Layout>
                <CalorieSideBar loginStatus={loginStatus}/>
                <ContentContainer loginStatus={loginStatus}/>
            </Layout>
        </div>
    );
}

export default App;

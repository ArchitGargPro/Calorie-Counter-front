import React from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import CalorieHeader from "./Components/PageHeader";
import CalorieSideBar from "./Components/User/SideBar";
import ContentContainer from "./Components/User/ContentContainer";

function App(){
    return(
        <div>
            <CalorieHeader />
            <Layout>
                <CalorieSideBar/>
                <ContentContainer/>
            </Layout>
        </div>
    );
}

export default App;

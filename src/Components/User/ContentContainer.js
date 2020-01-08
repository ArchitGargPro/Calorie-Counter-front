import CalorieContentHeader from "./ContentHeader";
import CalorieContentTable from "./ContentTable";
import {Layout} from "antd";
import React, {useEffect, useState} from "react";
import AuthUtil from "../../utils/AuthUtil";
const {Header, Content} = Layout;

function ContentContainer (props) {
    const [userAccess, setUserAccess] = useState(null);

    useEffect(() => {
        if(props.loginStatus) {
            setUserAccess(AuthUtil.getUser().access);
        } else {
            setUserAccess(null);
        }
    }, [props.loginStatus]);

    if(userAccess === null){
        return (
            <Layout>
                <p>
                    <h1 style={{padding:'20px'}}>   Please Login to continue</h1>
                </p>
            </Layout>
        );
    } else {
        return (
            <Layout>
                <Header>
                    <CalorieContentHeader access={userAccess} currentTable={props.currentTable} newUserAlert={props.newUserAlert} />
                </Header>
                <Content>
                    <CalorieContentTable access={userAccess}/>
                </Content>
            </Layout>
        );
    }
}

export default ContentContainer;

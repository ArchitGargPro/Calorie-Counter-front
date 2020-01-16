import {Layout} from "antd";
import React from "react";

function NotAuthorised (props) {
    return (
        <Layout style={{padding:'20px', textAlign:'center'}}>
            <h1>Welcome To Calorie Counter</h1>
            <h3>Not Authorised to View Content</h3>
        </Layout>
    )
}

export default NotAuthorised;

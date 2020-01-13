import React from 'react';
import { Layout } from "antd";
import CalorieSideBar from "./CalorieSideBar";
import ContentContainer from "./ContentContainer";
import WelcomePage from "../WelcomePage";
import {connect} from "react-redux";
import {ELogInStatus} from "../../Constants/EAccess";

function HomeContainer(props) {
    if (props.loginStatus !== ELogInStatus.LOGGEDIN) {
        return (<WelcomePage/>);
    } else {
        return (<Layout>
            <CalorieSideBar/>
            <ContentContainer/>
        </Layout>);
    }
}

const mapStateToProps = state => ({
    loginStatus: state.loginStatus,
});

export default connect(mapStateToProps)(HomeContainer);

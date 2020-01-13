import React from 'react';
import { Layout } from "antd";
import CalorieSideBar from "./CalorieSideBar";
import ContentContainer from "./ContentContainer";


function HomeContainer(props) {
    //TOdo check performed by privateroute
        return (
            <Layout>
                <CalorieSideBar/>
                <ContentContainer/>
            </Layout>);
}

export default HomeContainer;

import React from 'react';
import { Layout } from "antd";
import CalorieMealSideBar from "./CalorieMealSideBar";
import MealContentContainer from "./MealContentContainer";

function MealComponent(props) {
    //TOdo check performed by privateroute
    return (
        <Layout>
            <CalorieMealSideBar/>
            <MealContentContainer/>
        </Layout>);
}

export default MealComponent;

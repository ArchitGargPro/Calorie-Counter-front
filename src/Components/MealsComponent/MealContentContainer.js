import {Layout} from "antd";
import React, {useState} from "react";
import {connect} from "react-redux";
import MealContentHeader from "./MealContentHeader";
import MealContentTable from "./MealContentTable";
import ActionTypes from "../../store/actionTypes";
import {ETables} from "../../Constants/EAccess";

const {Header, Content} = Layout;

function MealContentContainer (props) {


    props.updateCurrentTableAction(ETables.MEAL);

    return (
        <Layout>
            <Header>
                <MealContentHeader />
            </Header>
            <Content>
                <MealContentTable />
            </Content>
        </Layout>
    );

}

const mapStateToProps = state => ({
    loginStatus : state.loginStatus
});

const mapDispatchToProps = dispatch => ({
    updateCurrentTableAction: currentTable => dispatch({
        type: ActionTypes.SET_CURRENT_TABLE,
        payload: {
            currentTable
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MealContentContainer);

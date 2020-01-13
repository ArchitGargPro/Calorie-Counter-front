import CalorieContentHeader from "./ContentContainers/ContentHeader";
import CalorieContentTable from "./ContentContainers/ContentTable";
import {Layout} from "antd";
import React, {useState} from "react";
import {connect} from "react-redux";
import {EAccess, ELogInStatus, ETables} from "../../Constants/EAccess";
import ActionTypes from "../../store/actionTypes";
import AuthUtil from "../../utils/AuthUtil";
const {Header, Content} = Layout;

function ContentContainer (props) {
    const [dateFilter, setDateFilter] = useState(null);
    const [timeFilter, setTimeFilter] = useState(null);
    const [newRowAlert, setNewRowAlert] = useState(false);

    console.log(props);
    if(props.loginStatus !== ELogInStatus.LOGGEDIN){
        return (
            <Layout>
                <h1 style={{padding:'20px'}}>   Please Login to continue</h1>
            </Layout>
        );
    } else {
        if (AuthUtil.getUser().access === EAccess.USER) {
            props.updateCurrentTableAction(ETables.MEAL);
        } else {
            props.updateCurrentTableAction(ETables.USER);
        }
        return (
            <Layout>
                <Header>
                    <CalorieContentHeader setDateFilter={setDateFilter} setTimeFilter={setTimeFilter} setNewRowAlert={setNewRowAlert}/>
                </Header>
                <Content>
                    <CalorieContentTable dateFilter={dateFilter} timeFilter={timeFilter} newRowAlert={newRowAlert} setNewRowAlert={setNewRowAlert}/>
                </Content>
            </Layout>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);

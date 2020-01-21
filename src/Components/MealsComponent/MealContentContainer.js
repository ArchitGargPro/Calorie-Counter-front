import {Layout} from "antd";
import React, {useState} from "react";
import MealContentHeader from "./MealContentHeader";
import MealContentTable from "./MealContentTable";
import {ETables} from "../../Constants/EAccess";

const {Header, Content} = Layout;

function MealContentContainer (props) {


    // props.updateCurrentTableAction(ETables.MEAL);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [search, setSearch] = useState('');


    return (
        <Layout>
            <Header>
                <MealContentHeader setStartTime={setStartTime} setEndTime={setEndTime} setStartDate={setStartDate} setEndDate={setEndDate} setSearch={setSearch}/>
            </Header>
            <Content>
                <MealContentTable  startTime={startTime} endTime={endTime} startDate={startDate} endDate={endDate} search={search}  />
            </Content>
        </Layout>
    );

}



export default (MealContentContainer);

import React from "react";
import EditableTable from "../../EditableTable";
import AuthUtil from "../../../utils/AuthUtil";
import {EAccess} from "../../../Constants/EAccess";
import TableMeal from "../../TableMeal";

function CalorieContentTable(props) {
    if(AuthUtil.getUser().access === EAccess.USER) {
        return (<div>
            <TableMeal/>
        </div>)
    } else {
        return (
            <div>
                <EditableTable dateFilter={props.dateFilter} newRowAlert={props.newRowAlert}
                               setNewRowAlert={props.setNewRowAlert}/>
            </div>
        );
    }
}

export default CalorieContentTable;

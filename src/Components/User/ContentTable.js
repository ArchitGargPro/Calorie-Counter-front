import React from "react";
import EditableFormTable from "./EditableTable";

function CalorieContentTable(props) {
    return(
        <div>
            <EditableFormTable newRowAlert={props.newRowAlert} setNewRowAlert={props.setNewRowAlert}/>
        </div>
    );
}

export default CalorieContentTable;

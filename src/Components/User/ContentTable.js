import React from "react";
import EditableFormTable from "./EditableTable";


function CalorieContentTable(props) {
    return(
        <div>
            <EditableFormTable access={props.access}/>
        </div>
    );

}



export default CalorieContentTable;

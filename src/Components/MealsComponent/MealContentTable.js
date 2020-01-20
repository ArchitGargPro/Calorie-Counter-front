import React from "react";
import TableMeal from "../TableMeal";
import AuthUtil from "../../utils/AuthUtil";
import {withRouter} from 'react-router-dom';

function MealContentTable(props) {
    if(AuthUtil.getUser().access === 1) {
        const userName = AuthUtil.getUser().userName;
        return (<div>
            <TableMeal userName={userName}/>
        </div>);
    }
    else if (props.match.url === '/meals' ){
        //TODO send whole meals in database and hide the + button
        return (<div>
            <TableMeal userName={null}/>
        </div>);
    }
    else{
        console.log('<<<<<<<<<<tabanjdkasjhhdasg>>>>>>>>>>>>>', props);
        const userName = props.match.params.userId;

        return (<div>
            <TableMeal userName={userName}/>
        </div>);
    }





}

export default  withRouter(MealContentTable);

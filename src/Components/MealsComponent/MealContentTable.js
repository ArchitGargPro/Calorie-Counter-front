import React from "react";
import TableMeal from "../TableMeal";
import AuthUtil from "../../utils/AuthUtil";
import {withRouter} from 'react-router-dom';

function MealContentTable(props) {

    // console.log('<<<<<<<<<<<<<<MealContentTable>>>>>>>>>>>>>>>>', props);
    if(AuthUtil.getUser().access === 1) {
        const userName = AuthUtil.getUser().userName;
        return (<div>
            <TableMeal userName={userName} props={props}/>
        </div>);
    }
    else if (props.match.url === '/meals' ){
        //TODO send whole meals in database and hide the + button
        return (<div>
            <TableMeal userName={null} props={props}/>
        </div>);
    }
    else{
        // console.log('<<<<<<<<<<tabanjdkasjhhdasg>>>>>>>>>>>>>', props);
        const userName = props.match.params.userId;
        return (<div>
            <TableMeal userName={userName} props={props}/>
        </div>);
    }





}

export default  withRouter(MealContentTable);

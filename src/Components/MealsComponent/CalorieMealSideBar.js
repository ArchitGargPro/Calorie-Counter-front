import {Layout, Menu, Input, Dropdown, Button, Icon, TimePicker, DatePicker, notification} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import AuthUtil from "../../utils/AuthUtil";
import Search from "antd/es/input/Search";
import ActionTypes from "../../store/actionTypes";
import {connect} from 'react-redux';
import Paths from "../../Constants/Path";
import Axios from "axios";

const {Sider} = Layout;


function CalorieMealSideBar(props){

    // const [tempExpectedValue, setTemp] = useState(props.expectedValue);

    const searchHandle = async () => {
        if (props.expectedValue && props.expectedValue > 0) {
            // console.log('vvvvvvvvvvvvvvvvvvvvvv',props.expectedValue);
            const url =  Paths.home + 'user/update';
            const header = AuthUtil.getHeaders();

            const response = await Axios.put(url, {'calorie': props.expectedValue, 'userName': AuthUtil.getUser().userName},{"headers": header});
            console.log('???????????????????????/>>>>>>>>>>>>>>>response>>>>>>>>>>>>>>>', response);
            // props.history.goBack()
            if (response.data.success) {
                props.setExpectedValue(response.data.data.calorie);
            } else {
                notification.open({
                    message: 'Error',
                    description:
                    response.data.message,
                });
            }

    } else {
            notification.open({
                message: 'Error',
                description: 'Expected Value cant be null or Zero',
            });
        }

    };
        // props.setExpectedValue(value);

    const handleChange = (e) =>{
        // setTemp(e.target.value);
        props.setExpectedValue(e.target.value);

    };

    return(
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub3']}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item key="1"> <Link to={(AuthUtil.getUser()).access === 1 ? '/me/meal' : '/home'} >Home</Link></Menu.Item>
                <Menu.Item key="2" ><Link to='/me'>View Profile</Link></Menu.Item>
                {(AuthUtil.getUser().access === 3)? null :
                            < Menu.Item key="3" >Expected Calories</Menu.Item>
                }
                {(AuthUtil.getUser().access === 3)? null :
                    <Menu.Item key="3"><Search type='number' placeholder="search" value={props.expectedValue} onChange={handleChange} onSearch={searchHandle}  enterButton={<Icon type='right' />}  /></Menu.Item>
                }
            {/*onChange={searchHandle}*/}

            </Menu>
        </Sider>
    );
}


const mapStateToProps = state => ({
    // mealData : state.mealData,
    expectedValue : state.expectedValue
});



const mapDispatchToProps = dispatch => ({
    setExpectedValue : (expectedValue) => dispatch({
        type: ActionTypes.SET_EXPECTED_DATA,
        payload: {
            expectedValue
        }
    })
});




export default connect(mapStateToProps, mapDispatchToProps)(CalorieMealSideBar);
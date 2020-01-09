import React, { useEffect, useState} from "react";
import {Form, Input, InputNumber, Popconfirm, Tag, Table} from "antd";
import {EAccess, Accesses, ETables, ELogInStatus} from "../../EAccess";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";
import {connect} from "react-redux";

const EditableContext = React.createContext();

function EditableCell(props) {
    const getInput = () => {
        if (props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    const renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    return (<EditableContext.Consumer>{renderCell}</EditableContext.Consumer>);
}

function EditableTable(props) {
    const columnSet ={
        meal: [
            {
                title: 'Date',
                dataIndex: 'date',
            },
            {
                title: 'Time',
                dataIndex: 'time',
            },
            {
                title: 'Calories',
                dataIndex: 'calorie',
                editable: true,
                inputType: 'number'
            },
            {
                title: 'Description',
                dataIndex: 'title',
                editable: true,
                inputType: 'string'
            },
            {
                title: '',
                dataIndex: '',
                render: (text, record) => {
                    if (isEditing(record)) {
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a onClick={() => save(form, record)} style={{marginRight: 8}} >
                                            Save
                                        </a>
                                    )}
                                </EditableContext.Consumer>
                                <a href=" " onClick={() => cancel(record.id)}>Cancel</a>
                            </span>
                        )
                    } else {
                        return (
                            <a onClick={() => edit(record.id)}>
                                Edit
                            </a>
                        );
                    }
                },
            },
            {
                title: '',
                dataIndex: '',

                render: (text, record) => {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record)}>
                            <a href=" ">Delete</a>
                        </Popconfirm>
                    );
                },
            },
        ],
        user: [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Username',
                dataIndex: 'userName',
            },
            {
                title: 'Password',
                dataIndex: 'password',
                editable: true,
                inputType: 'string'
            },
            {
                title: 'Access',
                dataIndex: 'access',
                editable: true,
                inputType: 'number',
                render: (access) => {
                    let color;
                    let accesses;
                    switch (access) {
                        case EAccess.USER : color = 'blue';
                            accesses = Accesses.USER;
                            break;
                        case EAccess.MANAGER: color = 'green';
                            accesses = Accesses.MANAGER;
                            break;
                        case EAccess.ADMIN: color = 'volcano';
                            accesses = Accesses.ADMIN;
                            break;
                        default : color='black';
                            accesses = Accesses.ANONYMOUS;
                    }
                    return (
                        <Tag color={color} key={access}>
                            {accesses}
                        </Tag>
                    );
                }
            },
            {
                title: 'Expected Calories(Per Day)',
                dataIndex: 'calorie',
                editable: true,
                inputType: 'number'
            },
            {
                title: '',
                dataIndex: '',
                render: (text, record) => {
                    if (isEditing(record)) {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a onClick={() => save(form, record)} style={{marginRight: 8}} >
                                            Save
                                        </a>
                                    )}
                                </EditableContext.Consumer>
                                <a onClick={() => cancel(record.id)}>Cancel</a>
                            </span>
                        )
                    } else {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <a onClick={() => edit(record.id)}>
                                Edit
                            </a>
                        );
                    }
                },
            },
            {
                title: '',
                dataIndex: '',

                render: (text, record) => {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record)}>
                            <a>Delete</a>
                        </Popconfirm>
                    );
                },
            },
        ],
    };

    const [data, setData] = useState(null);
    const [table, setTable] = useState(columnSet.meal);
    const [currentTable, setCurrentTable] = useState(props.currentTable);
    const [editingKey, setEditingKey] = useState();

    // set the table on mount
    useEffect(() => {
        setCurrentTable(props.currentTable)
    }, [props.currentTable]);

    // Re-render the data
    useEffect( () => {
        if (currentTable === ETables.MEAL) {
            setTable(columnSet.meal);
            getMealData();
        } else {
            setTable(columnSet.user);
            getUserData();
        }}, [currentTable, props.newRowAlert]);

    // turn off the new row alert
    useEffect(() => {
        props.setNewRowAlert(false);
    }, [props.newRowAlert]);

    // To avoid changing of table on edit complete or re render
    useEffect(() => {
        if (currentTable === ETables.MEAL) {
            setTable(columnSet.meal);
        } else {
            setTable(columnSet.user);
        }
    }, [editingKey]);

    const isEditing = record => record.id === editingKey;

    const editUserData = async (values, userName) =>{
        const url = 'http://localhost:3000/user/update';
        const header = AuthUtil.getHeaders();
        values.userName = userName;
        const response = await Axios.put(url,values, {"headers":header});
        if(response.data.success) {
            getUserData().then(() => {
                setEditingKey(null);
            });
        } else {
            alert(response.data.message);
        }
    };

    const editMealData = async (values, id) =>{
        const url = 'http://localhost:3000/meal/update';
        const header = AuthUtil.getHeaders();
        values.id = id;
        const response = await Axios.put(url, values, {"headers":header});
        console.log(response);
        if(response.data.success) {
            getMealData().then(() => {
                setEditingKey(null);
            });
        } else {
            alert(response.data.message);
        }
    };

    const getMealData = async () => {
        const url = 'http://localhost:3000/meal/';
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        if(response.data.success) {
            const d = response.data.data;
            setData(d);
        } else {
            if(response.data.message === "no meals found") {
                setData(null);
            } else {
                alert(response.data.message);
            }
        }
    };

    const getUserData = async () => {
        const url = 'http://localhost:3000/user/';
        const header = AuthUtil.getHeaders();
        const response = await Axios.get(url, {"headers":header});
        if(response.data.success) {
            const d = response.data.data;
            setData(d);
        } else {
            alert(response.data.message);
        }
    };

    const cancel = () => {
        setEditingKey(null);
    };

    const edit = async (id) => {
        setEditingKey(id);
    };

    const save = (form, record) => {
        form.validateFields((error, row) => {
            console.log('row', row, 'record', record);
            if (error) {
                return;
            }
            if (currentTable === ETables.USER) {
                editUserData(row, record.userName).then(() => {
                });
            } else {
                editMealData(row, record.id).then(() => {
                })
            }
        });
    };

    const deleteUserData = async (userName) => {
        const url = `http://localhost:3000/user/remove/${userName}`;
        const header = AuthUtil.getHeaders();
        const response = await Axios.delete(url, {"headers":header});
        console.log(userName, response);

        if(response.data.success) {
            getUserData().then(() => {
                setEditingKey(null);
            });
        } else {
            alert(response.data.message);
        }
    };

    const deleteMealData = async (id) => {
        const url = `http://localhost:3000/meal/delete/${id}`;
        const header = AuthUtil.getHeaders();
        const response = await Axios.delete(url, {"headers":header});
        console.log(response);

        if(response.data.success) {
            console.log(response);
            getMealData().then(() => {
                setEditingKey(null);
            });
        } else {
            alert(response.data.message);
        }
    };

    const del = (record) => {
        if(currentTable === ETables.USER) {
            deleteUserData(record.userName);
        } else {
            deleteMealData(record.id);
        }
        setEditingKey(null);
    };

    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const columns = table.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <EditableContext.Provider value={props.form}>
            <Table
                components={components}
                bordered
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                pagination={false}
            />
        </EditableContext.Provider>
    );
}

const EditableFormTable = Form.create()(EditableTable);

const mapStateToProps = state => ({
    currentTable: state.currentTable
});


export default connect(mapStateToProps)(EditableFormTable);

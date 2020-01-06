import React, { useEffect, useState} from "react";
import {Form, Input, InputNumber, Popconfirm, Tag, Table} from "antd";
import {EAccess, Accesses, ETables, ELogInStatus} from "../../EAccess";
import AuthUtil from "../../utils/AuthUtil";
import Axios from "axios";

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
    const tempData = {
        meal: [
            {
                id: '1',
                date: '12-12-12',
                time: '12:12',
                calorie: 1200,
                title: 'breakfast',
            },
            {
                id: '2',
                date: '12-12-12',
                time: '12:12',
                calorie: 1200,
                title: 'breakfast',
            },
        ],
        user: [
            {
                id:'1',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 3,
                calorie: '2400'
            },
            {
                id:'2',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 2,
                calorie: '2400'
            },
            {
                id:'3',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 1,
                calorie: '2400'
            }
        ]
    };

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
                                <a href=" " onClick={() => cancel(record.id)}>Cancel</a>
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record.id)}>
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    );
                },
            },
        ],
    };

    const [data, setData] = useState(tempData.meal);
    const [table, setTable] = useState(columnSet.meal);
    const [currentTable, setCurrentTable] = useState(ETables.MEAL);
    const [editingKey, setEditingKey] = useState();

    useEffect(() => {
        if(props.access === EAccess.USER) {
            setCurrentTable(ETables.MEAL)
        } else if(props.access ===EAccess.MANAGER || props.access === EAccess.ADMIN) {
            setCurrentTable(ETables.USER)
        }
    }, []);


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
            alert(response.message);
        }
    };

    const editMealData = async (values, userName) =>{
        const url = 'http://localhost:3000/meal/update';
        const header = AuthUtil.getHeaders();
        values.userName = userName;
        const response = await Axios.put(url, values, {"headers":header});
        if(response.data.success) {
            getUserData().then(() => {
                setEditingKey(null);
            });
        } else {
            alert(response.message);
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
            alert(response.message);
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
            alert(response.message);
        }
    };

    useEffect( () => {
        if (currentTable === ETables.MEAL) {
            setTable(columnSet.meal);
            getMealData();
        } else {
            setTable(columnSet.user);
            // TODO fetch data from db and set in data
            getUserData();
            // setData(tempData.user)
        }}, [currentTable]);

    const isEditing = record => record.id === editingKey;

    const cancel = () => {
        setEditingKey(null);
    };

    // To avoid changing of table on edit complete or re render
    useEffect(() => {
        if (currentTable === ETables.MEAL) {
            setTable(columnSet.meal);
        } else {
            setTable(columnSet.user);
        }
    }, [editingKey]);

    const edit = async (id) => {
        setEditingKey(id);
    };

    const save = (form, record) => {
        form.validateFields((error, row) => {
            console.log('row', row, 'record', record);

            if (error) {
                return;
            }
            // const newData = data;
            // const index = newData.findIndex(item => id === item.id);
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...row,
            //     });
            //     setData(newData);
            //     setEditingKey(null);
            // } else {
            //     newData.push(row);
            //     setData(newData);
            //     setEditingKey(null);
            // }
            if (currentTable === ETables.USER) {
                editUserData(row, record.userName).then(() => {
                    console.log('>>>>>');
                    getUserData().then(() => {
                        setEditingKey(null);
                    });
                });
            } else {
                setTable(columnSet.user);
                editMealData(row, record).then(() => {
                    console.log('meal values>>>');
                })
            }
        });
    };

    const del = (id) => {
        // TODO delete data
        setData(tempData.user);
        setCurrentTable(ETables.USER);
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
                // inputType: col.dataIndex === 'calorie'||'access' ? 'number' : 'text',
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

export default EditableFormTable;

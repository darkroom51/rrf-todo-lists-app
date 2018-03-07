import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';

import {urlTodoLists, urlTodos} from '../../config';
import TodoListAdd from './TodoListAdd'
import TodoListFilter from "./TodoListFilter";
import TodoListEdit from "./TodoListEdit";


class TodoList extends Component {
    state = {
        todoList: null,
        listId: this.props.match.params.id,

        newTaskName: '',
        filterTaskName: '',
        filterTasksSelect: 0,
        editMode: -1,
        editTaskName: '',
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        fetch(`${urlTodoLists}${this.state.listId}/`)
            .then(response => response.json())
            .then(data => this.setState({todoList: this.sortTasks(data)}))
    }

    sortTasks = (arr) => {
        return arr.sort((a,b)=>{
            return a.id - b.id
        })
    }

    addTask = () => {
        if (this.state.newTaskName) {
            const taskObj = {
                name: this.state.newTaskName,
                is_complete: false,
                todo_list: this.state.listId
            }
            fetch(`${urlTodos}`, {
                method: 'POST',
                body: JSON.stringify(taskObj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => {
                    this.getTasks();
                    this.setState({newTaskName: '', msg: 'Task has been added successfully', snackbarOpen: true})
                })
        }
    }

    deleteTask = (taskId) => {
        fetch(`${urlTodos}${taskId}/`, {
            method: 'DELETE'
        })
            .then(() => {
                this.getTasks();
                this.setState({msg: 'Task has been deleted successfully', snackbarOpen: true})
            })
    }

    toggleDoneTask = (taskId, taskDone) => {
        const taskObj = {
            is_complete: !taskDone
        }
        fetch(`${urlTodos}${taskId}/`, {
            method: 'PATCH',
            body: JSON.stringify(taskObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => {
                this.getTasks();
                this.setState({msg: 'Task "completed/uncompleted" toggled successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
    }

    editTask = (taskId, taskName) => {
        this.setState({editMode: taskId, editTaskName: taskName})
    }

    updateTask = (taskId, taskName) => {
        const taskObj = {
            name: taskName
        }
        fetch(`${urlTodos}${taskId}/`, {
            method: 'PATCH',
            body: JSON.stringify(taskObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => {
                this.getTasks();
                this.setState({editMode: -1, msg: 'Task name has been updated successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
    }

    cancelEditTask = () => {
        this.setState({editMode: -1, editTaskName: ''})
    }

    handleNewTaskNameInput = (event) => {this.setState({newTaskName: event.target.value})}
    handleFilterTaskName = (event, value) => {this.setState({filterTaskName: event.target.value})}
    handleFilterTasksSelect = (event, index, value) => {this.setState({filterTasksSelect: value})}
    handleEditTaskName = (event, value) => {this.setState({editTaskName: event.target.value})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false,})}


    render() {
        return (
            <div>
                <TodoListAdd
                    state={this.state}
                    handleNewTaskNameInput={this.handleNewTaskNameInput}
                    addTask={this.addTask}
                />

                <TodoListFilter
                    state={this.state}
                    handleFilterTaskName={this.handleFilterTaskName}
                    handleFilterTasksSelect={this.handleFilterTasksSelect}
                />

                <List>
                    <Subheader>Todo List</Subheader>
                    {
                        this.state.todoList
                        &&
                        this.state.todoList
                            .filter((el) => el.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterTaskName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                            .filter((el) => (this.state.filterTasksSelect === 0 ? true : this.state.filterTasksSelect === 1 ? el.is_complete === false : el.is_complete === true))
                            .map((el) => (
                                <div key={el.id}>
                                    <ListItem
                                        primaryText={
                                            <TodoListEdit
                                                state={this.state}
                                                el={el}
                                                editTask={this.editTask}
                                                handleEditTaskName={this.handleEditTaskName}
                                                updateTask={this.updateTask}
                                                cancelEditTask={this.cancelEditTask}
                                            />
                                        }
                                        rightIcon={
                                            <ActionDelete onClick={() => this.deleteTask(el.id)}/>
                                        }
                                        leftIcon={
                                            el.is_complete === false ?
                                                <CheckBoxOutlineBlank onClick={() => this.toggleDoneTask(el.id, el.is_complete)}/>
                                                :
                                                <CheckBox onClick={() => this.toggleDoneTask(el.id, el.is_complete)}/>
                                        }
                                        style={el.is_complete === false ? {textDecoration: 'none'} : {textDecoration: 'line-through', color: '#999'}}
                                        disabled={true}
                                    />
                                    <Divider/>
                                </div>
                            ))
                    }
                </List>
                <Divider/>
                <RaisedButton
                    label={"back to lists"}
                    default={true}
                    fullWidth={true}
                    icon={<ArrowBack />}
                    onClick={this.props.history.goBack}
                />
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.msg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
            </div>
        );
    }
}

export default TodoList;
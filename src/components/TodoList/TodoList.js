import React, {Component} from 'react';

import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'

import TodoListAdd from './TodoListAdd'
import TodoListEdit from './TodoListEdit'
import TodoListFilter from './TodoListFilter'
import {database} from '../../firebase'



class TodoList extends Component {
    state = {
        todoList: null,
        listId: this.props.match.params.id,

        newTaskName: '',
        filterTaskName: '',
        filterTasksSelect: 0,
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        database.ref(`/global/lists/${this.state.listId}/list/`)
            .on('value', (snapshot)=>
                this.setState({todoList: Object.entries(snapshot.val() || {})})
            )
    }

    addTask = () => {
        if (this.state.newTaskName) {
            const listObj = {
                name: this.state.newTaskName,
                completed: false,
                date: Date.now()
            }
            database.ref(`/global/lists/${this.state.listId}/list/`)
                .push(listObj)
                .then(() => {
                    this.setState({newTaskName: '', msg: 'Task has been added successfully', snackbarOpen: false})
                })
                .catch(() => {
                    this.setState({newTaskName: '', msg: 'Ups,task not added', snackbarOpen: true})
                })
        }
    }

    deleteTask = (taskId) => {
        database.ref(`/global/lists/${this.state.listId}/list/${taskId}`)
            .remove()
            .then(() => {
                this.setState({msg: 'Task has been deleted successfully', snackbarOpen: false})
            })
            .catch(() => {
                this.setState({msg: 'Ups, task not deleted', snackbarOpen: true})
            })
    }

    updateTask = (taskId, taskName) => {
        if (taskName) {
            const listObj = {
                name: taskName
                //date: Date.now()
            }
            database.ref(`/global/lists/${this.state.listId}/list/${taskId}`)
                .update(listObj)
                .then(() => {
                    this.setState({msg: 'Task has been updated successfully', snackbarOpen: false})
                })
                .catch(() => {
                    this.setState({msg: 'Ups, task not updated', snackbarOpen: true})
                })
        }
    }

    toggleDoneTask = (taskId, taskDone) => {
            const listObj = {
                completed: !taskDone
            }
            database.ref(`/global/lists/${this.state.listId}/list/${taskId}`)
                .update(listObj)
                .then(() => {
                    this.setState({msg: 'Task has been toggled successfully', snackbarOpen: false})
                })
                .catch(() => {
                    this.setState({msg: 'Ups, task not toggled', snackbarOpen: true})
                })
    }


    handleNewTaskName = (event) => {this.setState({newTaskName: event.target.value})}
    handleFilterTaskName = (event, value) => {this.setState({filterTaskName: event.target.value})}
    handleFilterTasksSelect = (event, index, value) => {this.setState({filterTasksSelect: value})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false,})}


    render() {
        return (
            <div>
                <TodoListAdd
                    newTaskName={this.state.newTaskName}
                    handleNewTaskName={this.handleNewTaskName}
                    addTask={this.addTask}

                />
                <TodoListFilter
                    filterTaskName={this.state.filterTaskName}
                    handleFilterTaskName={this.handleFilterTaskName}
                />
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <List>
                        {
                            this.state.todoList
                            &&
                            this.state.todoList
                                .filter(([key,val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterTaskName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                                .map(([key,val])=>(
                                    <ListItem button
                                              key={key}
                                              onClick={()=>{this.toggleDoneTask(key, val.completed)}}
                                    >
                                        <Checkbox
                                            checked={val.completed}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                        <ListItemText primary={val.name}/>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                <TodoListEdit
                                                    id={key}
                                                    name={val.name}
                                                    updateTask={this.updateTask}
                                                />
                                            </IconButton>
                                            <IconButton aria-label="Comments">
                                                <DeleteIcon
                                                    onClick={()=>{this.deleteTask(key)}}
                                                />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                        }
                    </List>
                </div>
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <Button
                        variant={"raised"}
                        color={"default"}
                        fullWidth={true}
                        onClick={this.props.history.goBack}
                    >
                        back to lists
                    </Button>
                </div>

                <Snackbar
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration={2000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.msg}</span>}
                />
            </div>
        );
    }
}

export default TodoList;
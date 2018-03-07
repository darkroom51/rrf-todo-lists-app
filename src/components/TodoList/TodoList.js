import React, {Component} from 'react';

import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button'

import TodoListAdd from './TodoListAdd'
import {database} from '../../firebase'



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
                    this.setState({newTaskName: '', msg: 'Task has been added successfully', snackbarOpen: true})
                })
                .catch(() => {
                    this.setState({newTaskName: '', msg: 'Ups,task not added', snackbarOpen: true})
                })
        }
    }

    deleteTask = (taskId) => {
        database.ref(`/global/lists/${this.state.listId}/list/${taskId}`)
            .remove()
    }


    handleNewTaskName = (event) => {this.setState({newTaskName: event.target.value})}
    handleFilterTaskName = (event, value) => {this.setState({filterTaskName: event.target.value})}
    handleFilterTasksSelect = (event, index, value) => {this.setState({filterTasksSelect: value})}
    handleEditTaskName = (event, value) => {this.setState({editTaskName: event.target.value})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false,})}


    render() {
        return (
            <div>
                <TodoListAdd
                    state={this.state}
                    handleNewTaskName={this.handleNewTaskName}
                    addTask={this.addTask}

                />
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <List>
                        {
                            this.state.todoList
                            &&
                            this.state.todoList
                                .map(([key,val])=>(
                                    <ListItem button key={key}>
                                        <ListItemText primary={val.name} secondary={val.completed} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                <DeleteIcon onClick={()=>{this.deleteTask(key)}} />
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
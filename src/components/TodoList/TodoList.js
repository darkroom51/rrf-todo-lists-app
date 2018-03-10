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

import {connect} from 'react-redux'
import {syncList, stopSyncingList, pushTask, removeTask, updateTask} from "../../state/list";


class TodoList extends Component {
    state = {
        listId: this.props.match.params.id,
        newTaskName: '',
        filterTaskName: '',
        filterTasksSelect: 0,
        snackbarOpen: false
    }


    componentDidMount() {
        this.props.syncList(this.state.listId)
    }

    componentWillUnmount() {
        this.props.stopSyncingList(this.state.listId)
    }


    addTask = () => {
        if (this.state.newTaskName) {
            const taskObj = {
                name: this.state.newTaskName,
                completed: false,
                date: Date.now()
            }
            this.props.pushTask(this.state.listId, taskObj)
            this.setState({newTaskName: '', snackbarOpen: true})
        }
    }

    updateTask = (taskId, taskName) => {
        if (taskName) {
            const taskObj = {
                name: taskName
            }
            this.props.updateTask(taskId, this.state.listId, taskObj)
            this.setState({snackbarOpen: true})
        }
    }

    deleteTask = (taskId) => {
        this.props.removeTask(taskId, this.state.listId)
        this.setState({snackbarOpen: true})
    }

    toggleDoneTask = (taskId, taskDone) => {
        const taskObj = {
            completed: !taskDone
        }
        this.props.updateTask(taskId, this.state.listId, taskObj)
        this.setState({snackbarOpen: true})
    }


    handleNewTaskName = (event) => {this.setState({newTaskName: event.target.value})}
    handleFilterTaskName = (event) => {this.setState({filterTaskName: event.target.value})}
    handleFilterTasksSelect = (event) => {this.setState({filterTasksSelect: event.target.value})}
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
                    filterTasksSelect={this.state.filterTasksSelect}
                    handleFilterTaskName={this.handleFilterTaskName}
                    handleFilterTasksSelect={this.handleFilterTasksSelect}
                />
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <List>
                        {
                            this.props.listData
                            &&
                            this.props.listData
                                .filter(([key,val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterTaskName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                                .filter(([key,val]) => (this.state.filterTasksSelect === 0 ? true : this.state.filterTasksSelect === 1 ? val.completed === false : val.completed === true))
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
                    message={<span id="message-id">{this.props.msg}</span>}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: Object.entries(state.list.listData),
    uuid: state.auth.user.uid,
    msg: state.list.msg
})


const mapDispatchToProps = dispatch => ({
    syncList: (listId) => dispatch(syncList(listId)),
    stopSyncingList: (listId) => dispatch(stopSyncingList(listId)),
    pushTask: (listId, newTask) => dispatch(pushTask(listId, newTask)),
    updateTask: (taskId, listId, updatedTask) => dispatch(updateTask(taskId, listId, updatedTask)),
    removeTask: (taskId, listId) => dispatch(removeTask(taskId, listId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
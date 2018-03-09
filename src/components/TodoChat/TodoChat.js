import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button'
import NotInterestedIcon from 'material-ui-icons/NotInterested';

import TodoChatAdd from './TodoChatAdd'
import TodoChatEdit from './TodoChatEdit'

import {connect} from 'react-redux'
import {database} from '../../firebase'


class TodoChat extends Component {
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
        database.ref(`/chat/list/`)
            .on('value', (snapshot)=>
                this.setState({todoList: Object.entries(snapshot.val() || {})})
            )
    }

    addTask = () => {
        if (this.state.newTaskName) {
            const listObj = {
                name: this.state.newTaskName,
                email: this.props.email,
                dateAdd: Date.now(),
                dateEdit: Date.now()
            }
            database.ref(`/chat/list/`)
                .push(listObj)
                .then(() => {
                    this.setState({newTaskName: '', msg: 'Task has been added successfully', snackbarOpen: false})
                })
                .catch(() => {
                    this.setState({newTaskName: '', msg: 'Ups,task not added', snackbarOpen: true})
                })
        }
    }

    updateTask = (taskId, taskName) => {
        if (taskName) {
            const listObj = {
                name: taskName,
                dateEdit: Date.now()
            }
            database.ref(`/chat/list/${taskId}`)
                .update(listObj)
                .then(() => {
                    this.setState({msg: 'Task message updated :)', snackbarOpen: true})
                })
                .catch(() => {
                    this.setState({msg: 'Ups, task message not updated', snackbarOpen: true})
                })
        }
    }


    handleNewTaskName = (event) => {this.setState({newTaskName: event.target.value})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false,})}


    render() {
        return (
            <div>
                <TodoChatAdd
                    newTaskName={this.state.newTaskName}
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
                                .filter(([key,val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterTaskName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                                .map(([key,val])=>(
                                    <ListItem button key={key}>
                                        <ListItemText primary={val.name} secondary={val.email}/>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                {
                                                    val.email === this.props.email
                                                        ?
                                                        <TodoChatEdit
                                                            id={key}
                                                            name={val.name}
                                                            updateTask={this.updateTask}
                                                        />
                                                        :
                                                        <NotInterestedIcon />
                                                }
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                        }
                    </List>
                </div>
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <Link to="/">
                    <Button
                        variant={"raised"}
                        color={"default"}
                        fullWidth={true}
                    >
                        back to lists
                    </Button>
                    </Link>
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

const mapStateToProps = state => ({
    uuid: state.auth.user.uid,
    email: state.auth.user.email
})


const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoChat)
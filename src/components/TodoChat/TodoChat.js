import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import List, {ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button'
import NotInterestedIcon from 'material-ui-icons/NotInterested';
import DeleteIcon from 'material-ui-icons/Delete';

import TodoChatAdd from './TodoChatAdd'
import TodoChatEdit from './TodoChatEdit'

import {connect} from 'react-redux'
import {pushMessage, updateMessage, removeMessage} from "../../state/chat";


class TodoChat extends Component {
    state = {
        listId: this.props.match.params.id,

        newTaskName: '',
        filterTaskName: '',
        filterTasksSelect: 0,
        snackbarOpen: false,
        msg: ''
    }


    addTask = () => {
        if (this.state.newTaskName) {
            const listObj = {
                name: this.state.newTaskName,
                email: this.props.email,
                dateAdd: Date.now(),
                dateEdit: Date.now()
            }
            this.props.pushMessage(listObj)
            this.setState({newTaskName:''})
        }
    }

    updateTask = (taskId, taskName) => {
        if (taskName) {
            const listObj = {
                name: taskName,
                dateEdit: Date.now()
            }
            this.props.updateMessage(taskId, listObj)
        }
    }

    deleteTask = (id) => {
        this.props.removeMessage(id)
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
                <Divider style={{margin: '20px 0 20px 0'}}/>

                <div>
                    <List>
                        {
                            this.props.chatData
                            &&
                            this.props.chatData
                                .filter(([key, val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterTaskName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                                .map(([key, val]) => (
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
                                                        <NotInterestedIcon/>
                                                }
                                            </IconButton>
                                                {
                                                    this.props.email === 'w@w.pl'
                                                        ?
                                                        <IconButton>
                                                            <DeleteIcon onClick={()=>{this.deleteTask(key)}}/>
                                                        </IconButton>
                                                        :
                                                        null
                                                }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                        }
                    </List>
                </div>
                <Divider style={{margin: '20px 0 20px 0'}}/>

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
    chatData: Object.entries(state.chat.chatData),
    uuid: state.auth.user.uid,
    email: state.auth.user.email
})


const mapDispatchToProps = dispatch => ({
    pushMessage: (newMessage) => dispatch(pushMessage(newMessage)),
    updateMessage: (id, updatedMessage) => dispatch(updateMessage(id, updatedMessage)),
    removeMessage: (id) => dispatch(removeMessage(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoChat)
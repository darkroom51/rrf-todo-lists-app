import React, {Component} from 'react';

import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import WorkIcon from 'material-ui-icons/Work';
import ChatIcon from 'material-ui-icons/Chat';
import ViewListIcon from 'material-ui-icons/ViewList';
import WbSunnyIcon from 'material-ui-icons/WbSunny';

import TodoListsAdd from './TodoListsAdd'
import {database} from '../../firebase'


const AvatarIco = (props) => {
    switch (props.type) {
        case 'general': return <ViewListIcon />;
        case 'work': return <WorkIcon />;
        case 'fun': return <WbSunnyIcon />;
        case 'chat': return <ChatIcon />;
        default: return null;
    }
}

class TodoLists extends Component {
    state = {
        todoLists: null,

        newListName: '',
        newListType: 'general',
        newListDate: null,
        filterListName: '',
        emptyListToggle: false,
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getLists()
    }

    getLists = () => {
        database.ref(`/global/lists/`)
            .on('value', (snapshot)=>
                this.setState({todoLists: Object.entries(snapshot.val() || {})})
            )
    }

    sortLists = (arr) => {
        return arr.sort((a,b)=>{
            return a.id - b.id
        })
    }

    addList = () => {
        if (this.state.newListName) {
            const listObj = {
                name: this.state.newListName,
                type: this.state.newListType,
                date: Date.now()
            }
            database.ref('/global/lists/')
                .push(listObj)
                .then(() => {
                    this.setState({newListName: '', msg: 'List has been added successfully', snackbarOpen: true})
                })
                .catch(() => {
                    this.setState({newListName: '', msg: 'Ups, list not added', snackbarOpen: true})
                })
        }
    }


    // deleteList = (listId) => {
    //     fetch(`${urlTodoLists}${listId}/`, {
    //         method: 'DELETE'
    //     })
    //         .then(() => {
    //             this.getLists();
    //             this.setState({msg: 'List has been deleted successfully', snackbarOpen: true})
    //         })
    // }
    //
    // updateList = (listId, listName) => {
    //     const listObj = {
    //         name: listName
    //     }
    //     fetch(`${urlTodoLists}${listId}/`, {
    //         method: 'PATCH',
    //         body: JSON.stringify(listObj),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    //         .then(() => {
    //             this.getLists();
    //             this.setState({msg: 'List name has been updated successfully', snackbarOpen: true})
    //         })
    //         .catch(err => console.log(err))
    // }

    handleNewListName = (event) => {this.setState({newListName: event.target.value})}
    handleNewListType = (event) => {this.setState({newListType: event.target.value})}
    handleFilterListName = (event, value) => {this.setState({filterListName: event.target.value})}
    handleEmptyListToggle = (event, toggle) => {this.setState({emptyListToggle: toggle})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false})}


    render() {
        return (
            <div>
                <TodoListsAdd
                    state={this.state}
                    handleNewListName={this.handleNewListName}
                    handleNewListType={this.handleNewListType}
                    addList={this.addList}

                />
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <List>
                    {
                        this.state.todoLists
                        &&
                        this.state.todoLists
                            .map(([key,val])=>(
                                <ListItem key={key}>
                                    <Avatar>
                                        <AvatarIco type={val.type} />
                                    </Avatar>
                                    <ListItemText primary={val.name} secondary="Jan 9, 2014" />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Comments">
                                            <SettingsIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                    }
                    </List>
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

export default TodoLists;
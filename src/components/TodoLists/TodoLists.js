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
import Menu from 'material-ui/Menu';

import TodoListsAdd from './TodoListsAdd'
import TodoListsEdit from './TodoListsEdit'
import TodoListsDelete from './TodoListsDelete'
import TodoListsFilter from './TodoListsFilter'
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
        anchorEl: null,
        dialogOpen: false,
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

    deleteList = (listId) => {
        database.ref(`/global/lists/${listId}`)
            .remove()
            .then(() => {
                this.setState({msg: 'List has been deleted successfully', snackbarOpen: true})
            })
            .catch(() => {
                this.setState({msg: 'Ups, list not deleted', snackbarOpen: true})
            })
    }

    updateList = (listId, listName, listType) => {
        if (listName) {
            const listObj = {
                name: listName,
                type: listType,
                //date: Date.now()
            }
            database.ref(`/global/lists/${listId}`)
                .update(listObj)
                .then(() => {
                    this.setState({newListName: '', msg: 'List has been updated successfully', snackbarOpen: true})
                })
                .catch(() => {
                    this.setState({newListName: '', msg: 'Ups, list not updated', snackbarOpen: true})
                })
        }
    }


    handleNewListName = (event) => {this.setState({newListName: event.target.value})}
    handleNewListType = (event) => {this.setState({newListType: event.target.value})}
    handleFilterListName = (event, value) => {this.setState({filterListName: event.target.value})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false})}
    handleMenuClick = event => {this.setState({ anchorEl: event.currentTarget })};
    handleMenuClose = () => {this.setState({ anchorEl: null })};


    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <TodoListsAdd
                    newListName={this.state.newListName}
                    newListType={this.state.newListType}
                    handleNewListName={this.handleNewListName}
                    handleNewListType={this.handleNewListType}
                    addList={this.addList}

                />
                <TodoListsFilter
                    filterListName={this.state.filterListName}
                    handleFilterListName={this.handleFilterListName}
                />
                <Divider style={{margin:'20px 0 20px 0'}} />

                <div>
                    <List>
                    {
                        this.state.todoLists
                        &&
                        this.state.todoLists
                            .filter(([key,val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterListName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                            .map(([key,val])=>(
                                <ListItem button
                                          key={key}
                                          onClick={() => {this.props.history.push(`/todo-list/${key}`)}}
                                >
                                    <Avatar>
                                        <AvatarIco type={val.type} />
                                    </Avatar>
                                    <ListItemText primary={val.name} secondary={val.date} />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Comments">
                                            <SettingsIcon aria-owns={anchorEl ? 'simple-menu' : null}
                                                          aria-haspopup="true"
                                                          onClick={this.handleMenuClick}
                                            />
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.handleMenuClose}
                                            >
                                                <TodoListsEdit
                                                    id={key}
                                                    name={val.name}
                                                    type={val.type}
                                                    handleMenuClose={this.handleMenuClose}
                                                    updateList={this.updateList}
                                                />
                                                <TodoListsDelete
                                                    id={key}
                                                    handleMenuClose={this.handleMenuClose}
                                                    deleteList={this.deleteList}
                                                />
                                            </Menu>
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
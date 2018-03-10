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

import moment from 'moment'
import {connect} from 'react-redux'
import {pushList, updateList, removeList} from '../../state/lists'


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
        newListName: '',
        newListType: 'general',
        newListDate: null,
        filterListName: '',
        anchorEl: null,
        dialogOpen: false,
        snackbarOpen: false
    }

    addList = () => {
        if (this.state.newListName) {
            const listObj = {
                name: this.state.newListName,
                type: this.state.newListType,
                date: Date.now()
            }
            this.props.pushList(listObj)
            this.setState({newListName:'', snackbarOpen:true})
        }
    }

    updateList = (listId, listName, listType) => {
        if (listName) {
            const listObj = {
                name: listName,
                type: listType
            }

            this.props.updateList(listId, listObj)
            this.setState({snackbarOpen:true})
        }
    }

    deleteList = (listId) => {
        this.props.removeList(listId)
        this.setState({snackbarOpen:true})
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
                        this.props.listsData
                        &&
                        this.props.listsData
                            .filter(([key,val]) => val.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterListName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                            .map(([key,val])=>(
                                <ListItem button
                                          key={key}
                                          onClick={() => {this.props.history.push(`/todo-list/${key}`)}}
                                >
                                    <Avatar>
                                        <AvatarIco type={val.type} />
                                    </Avatar>
                                    <ListItemText primary={val.name} secondary={moment(val.date).format("YYYY-MM-DD")} />
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
                    message={<span id="message-id">{this.props.msg}</span>}
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    listsData: Object.entries(state.lists.listsData),
    uuid: state.auth.user.uid,
    msg: state.lists.msg
})


const mapDispatchToProps = dispatch => ({
    pushList: (newList) => dispatch(pushList(newList)),
    updateList: (listId, updatedList) => dispatch(updateList(listId, updatedList)),
    removeList: (listId) => dispatch(removeList(listId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoLists)
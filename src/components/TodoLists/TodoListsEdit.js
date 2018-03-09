import React, {Component} from 'react';

import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';


class TodoListsEdit extends Component {
    state = {
        editedListName: this.props.name,
        editedListType: this.props.type,
        dialogOpen: false
    }


    handleDialogClick = () => {this.setState({dialogOpen: true})}
    handleDialogClose = () => {this.setState({dialogOpen: false})}
    handleEditedListName = (event) => {this.setState({editedListName: event.target.value})}
    handleEditedListType = (event) => {this.setState({editedListType: event.target.value})}

    handleUpdate = () => {
        this.props.updateList(this.props.id, this.state.editedListName, this.state.editedListType)
        this.handleDialogClose()
        this.props.handleMenuClose()
    }

    handleCancel = () => {
        this.handleDialogClose()
        this.props.handleMenuClose()
    }


    render() {
        return (
            <div>
                <MenuItem onClick={this.handleDialogClick}>Edit List</MenuItem>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit List</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="edited-list-name"
                            label="List Name"
                            type="text"
                            value={this.state.editedListName}
                            onChange={this.handleEditedListName}
                        />
                        <Select
                            value={this.state.editedListType}
                            onChange={this.handleEditedListType}
                            fullWidth={true}
                        >
                            <MenuItem value={'general'}><em>General</em></MenuItem>
                            <MenuItem value={'work'}>Work</MenuItem>
                            <MenuItem value={'fun'}>Fun</MenuItem>
                            {/*<MenuItem value={'chat'}>Chat ;)</MenuItem>*/}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TodoListsEdit;
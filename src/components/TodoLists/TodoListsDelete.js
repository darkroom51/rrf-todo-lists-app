import React, {Component} from 'react';

import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';


class TodoListsDelete extends Component {
    state = {
        dialogOpen: false
    }


    handleDialogClick = () => {this.setState({dialogOpen: true})}
    handleDialogClose = () => {this.setState({dialogOpen: false})}
    handleDelete = () => {
        this.props.deleteList(this.props.id)
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
                <MenuItem onClick={this.handleDialogClick}>Delete List</MenuItem>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Deleting list is permanent. You'll also remove all todos from this list.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TodoListsDelete;
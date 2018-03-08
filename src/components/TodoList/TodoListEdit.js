import React, {Component} from 'react';

import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import BorderColorIcon from 'material-ui-icons/BorderColor';


class TodoListEdit extends Component {
    state = {
        editedTaskName: this.props.name,
        dialogOpen: false
    }


    handleDialogClick = () => {this.setState({dialogOpen: true})}
    handleDialogClose = () => {this.setState({dialogOpen: false})}
    handleEditedTaskName = (event) => {this.setState({editedTaskName: event.target.value})}

    handleUpdate = () => {
        this.props.updateTask(this.props.id, this.state.editedTaskName)
        this.handleDialogClose()
    }

    handleCancel = () => {
        this.handleDialogClose()
    }


    render() {
        return (
            <div>
                <BorderColorIcon onClick={this.handleDialogClick} />
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="edited-Task-name"
                            label="Task Name"
                            type="text"
                            value={this.state.editedTaskName}
                            onChange={this.handleEditedTaskName}
                        />
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

export default TodoListEdit;
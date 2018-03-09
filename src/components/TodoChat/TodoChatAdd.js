import React from 'react';

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


const TodoChatAdd = (props) => (
    <div>
        <TextField
            id="newTaskName"
            label="New task message ;)"
            placeholder="Enter message ..."
            margin="normal"
            fullWidth={true}
            value={props.newTaskName}
            onChange={props.handleNewTaskName}
        />
        <Button
            variant={"raised"}
            color={"primary"}
            fullWidth={true}
            onClick={props.addTask}
        >
            send
        </Button>
    </div>
)

export default TodoChatAdd;
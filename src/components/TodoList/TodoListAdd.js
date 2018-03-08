import React from 'react';

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


const TodoListAdd = (props) => (
    <div>
        <TextField
            id="newTaskName"
            label="New Task Name"
            placeholder="Enter task ..."
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
            add todo
        </Button>
    </div>
)

export default TodoListAdd;
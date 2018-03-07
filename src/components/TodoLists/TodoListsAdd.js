import React from 'react';

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


const TodoListsAdd = (props) => (
    <div>
        <TextField
            id="newListName"
            label="New List Name"
            placeholder="Enter name ..."
            margin="normal"
            fullWidth={true}
            value={props.state.newListName}
            onChange={props.handleNewListName}
        />
        <Button
            variant={"raised"}
            color={"primary"}
            fullWidth={true}
            onClick={props.addList}
        >
            create list
        </Button>
    </div>
)

export default TodoListsAdd;
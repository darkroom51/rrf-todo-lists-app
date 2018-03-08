import React from 'react';

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';


const TodoListsAdd = (props) => (
    <div>
        <TextField
            id="newListName"
            label="New List Name"
            placeholder="Enter name ..."
            margin="normal"
            fullWidth={true}
            value={props.newListName}
            onChange={props.handleNewListName}
        />
        <Select
            value={props.newListType}
            onChange={props.handleNewListType}
            fullWidth={true}
        >
            <MenuItem value={'general'}><em>General</em></MenuItem>
            <MenuItem value={'work'}>Work</MenuItem>
            <MenuItem value={'fun'}>Fun</MenuItem>
            <MenuItem value={'chat'}>Chat ;)</MenuItem>
        </Select>
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
import React from 'react';

import TextField from 'material-ui/TextField'
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {FormControl} from 'material-ui/Form';

const TodoListFilter = (props) => (
    <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {
                        props.filterTaskName !== '' || props.filterTasksSelect !== 0
                            ?
                            "Filter is ON"
                            :
                            "Filter Your Tasks"
                    }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormControl>
                <TextField
                    id="filterTaskName"
                    label="Find Your Task"
                    placeholder="Enter name ..."
                    margin="normal"
                    fullWidth={true}
                    value={props.filterTaskName}
                    onChange={props.handleFilterTaskName}
                />
                </FormControl>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                <FormControl>
                    <Select
                        value={props.filterTasksSelect}
                        onChange={props.handleFilterTasksSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={0}><em>All</em></MenuItem>
                        <MenuItem value={1}>Undone</MenuItem>
                        <MenuItem value={2}>Done</MenuItem>
                    </Select>
                </FormControl>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
)

export default TodoListFilter;
import React from 'react';

import TextField from 'material-ui/TextField'
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


const TodoListFilter = (props) => (
    <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {
                        props.filterTaskName !== ''
                            ?
                            "Filter is ON"
                            :
                            "Filter Your Tasks"
                    }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TextField
                    id="filterTaskName"
                    label="Find Your Task"
                    placeholder="Enter name ..."
                    margin="normal"
                    fullWidth={true}
                    value={props.filterTaskName}
                    onChange={props.handleFilterTaskName}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
)

export default TodoListFilter;
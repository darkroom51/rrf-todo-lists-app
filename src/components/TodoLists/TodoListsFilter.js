import React from 'react';

import TextField from 'material-ui/TextField'
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


const TodoListsFilter = (props) => (
    <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {
                        props.filterListName !== ''
                            ?
                            "Filter is ON"
                            :
                            "Filter Your Lists"
                    }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TextField
                    id="filterListName"
                    label="Find Your List"
                    placeholder="Enter name ..."
                    margin="normal"
                    fullWidth={true}
                    value={props.filterListName}
                    onChange={props.handleFilterListName}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
)

export default TodoListsFilter;
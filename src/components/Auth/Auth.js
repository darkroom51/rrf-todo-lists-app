import React from 'react'

import Forms from './Forms'
import MuiAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CheckBoxIcon from 'material-ui-icons/CheckBox';

import {connect} from 'react-redux'

const Auth  = (props) => (
            props.userData ?
                props.children
                :
                <div>
                    <MuiAppBar position="static">
                        <Toolbar>
                            <IconButton  color="inherit" aria-label="Menu">
                                <CheckBoxIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Todo Lists
                            </Typography>
                        </Toolbar>
                    </MuiAppBar>
                <Forms />
                </div>
        )


const mapStateToProps = state => ({
    userData: state.auth.user
})

export default connect(
    mapStateToProps
)(Auth)
import React, {Component} from 'react'

import Forms from './Forms'
import MuiAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CheckBoxIcon from 'material-ui-icons/CheckBox';
import Reboot from 'material-ui/Reboot';
import Snackbar from 'material-ui/Snackbar';

import {connect} from 'react-redux'

class Auth extends Component {
    state={
        snackbarOpen: false
    }

    handleSnackbarClose = () => {this.setState({snackbarOpen: false})}

    render() {
        console.log(this.props.msg) //TODO find way to use Snackbar with Redux

        return (
            this.props.userData ?
                this.props.children
                :
                <div className="wld-container">
                    <Reboot/>
                    <MuiAppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <CheckBoxIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Todo Lists
                            </Typography>
                        </Toolbar>
                    </MuiAppBar>
                    <Forms/>
                    <Snackbar
                        open={this.state.snackbarOpen}
                        onClose={this.handleSnackbarClose}
                        autoHideDuration={2000}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.props.msg}</span>}
                    />
                </div>
        )
    }
}


const mapStateToProps = state => ({
    userData: state.auth.user,
    msg: state.auth.msg,
    snackbarOpen: state.auth.snackbarOpen
})

export default connect(
    mapStateToProps
)(Auth)
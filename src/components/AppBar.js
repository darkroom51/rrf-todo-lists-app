import React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import {connect} from 'react-redux'
import {logOut} from '../state/auth'



const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const AppBar = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon onClick={props.drawerToggle} />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Todo Lists
                    </Typography>
                    <Button color="inherit" onClick={() => props.onLogOutClick()}>Logout</Button>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
}



const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onLogOutClick: () => dispatch(logOut()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AppBar))
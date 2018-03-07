import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';

class SideBar extends Component {
    render() {
        return (
            <Drawer
                open={this.props.isOpen}
                onClose={this.props.drawerToggle}
            >
                <List style={{width: 250}} component={"nav"}>
                    <Link to={'/'} style={{textDecoration: 'none'}} key={'1'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Global Lists"/>
                        </ListItem>
                    </Link>
                    <Link to={'/'} style={{textDecoration: 'none'}} key={'2'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="My Lists"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        )
    }
}

export default SideBar
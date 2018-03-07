import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';

class SideBar extends Component {
    render() {
        return (
            <Drawer
                open={this.props.isOpen}
                onClose={this.props.drawerToggle}
            >
                <List style={{width: 250}} component={"nav"}>
                    <Link to={''} style={{textDecoration: 'none'}} key={'1'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Hello world"/>
                        </ListItem>
                    </Link>
                    <Link to={''} style={{textDecoration: 'none'}} key={'2'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Hello again"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        )
    }
}

export default SideBar
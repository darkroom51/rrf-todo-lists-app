import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import ChatIcon from 'material-ui-icons/Chat';

class SideBar extends Component {
    render() {
        return (
            <Drawer
                open={this.props.isOpen}
                onClose={this.props.drawerToggle}
            >
                <List style={{width: 250}} component={"nav"}>
                    <Link to={'/'} style={{textDecoration: 'none'}} key={'2'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="My Todo Lists"/>
                        </ListItem>
                    </Link>
                    <Link to={'/todo-chat/'} style={{textDecoration: 'none'}} key={'1'}>
                        <ListItem button onClick={this.props.drawerToggle}>
                            <ListItemIcon>
                                <ChatIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Todo Chat ;)"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        )
    }
}

export default SideBar
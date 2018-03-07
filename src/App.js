import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Reboot from 'material-ui/Reboot';
import Paper from 'material-ui/Paper'

import Auth from './components/Auth'
import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import UserBar from './components/UserBar'

import TodoLists from './components/TodoLists'
import TodoList from './components/TodoList'

import {Provider} from 'react-redux'
import store from './store'


class App extends Component {

    state = {
        isDrawerOpen: false
    }

    drawerToggle = () => {
        this.setState({isDrawerOpen: !this.state.isDrawerOpen})
    }

    render() {
        return (
            <Provider store={store}>
                    <Auth>
                        <Router>
                            <div>
                                <Reboot />
                                <AppBar drawerToggle={this.drawerToggle}/>
                                <UserBar />
                                <SideBar
                                    isOpen={this.state.isDrawerOpen}
                                    drawerToggle={this.drawerToggle}
                                />

                                <Paper style={{margin:10, padding:10}}>
                                    <Route path="/" exact={true} component={TodoLists}/>
                                    <Route path="/todo-list/:id/" component={TodoList}/>
                                </Paper>
                            </div>
                        </Router>
                    </Auth>
            </Provider>
        );
    }
}

export default App;
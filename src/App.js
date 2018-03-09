import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

import Reboot from 'material-ui/Reboot';
import Paper from 'material-ui/Paper'

import Auth from './components/Auth'
import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import UserBar from './components/UserBar'
import TodoLists from './components/TodoLists'
import TodoList from './components/TodoList'
import TodoChat from './components/TodoChat'

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
                            <div className="wld-container">
                                <Reboot />
                                <AppBar drawerToggle={this.drawerToggle}/>
                                <UserBar />
                                <SideBar
                                    isOpen={this.state.isDrawerOpen}
                                    drawerToggle={this.drawerToggle}
                                />

                                <Paper className="wld-paper-pm">
                                    <Route path="/" exact={true} component={TodoLists}/>
                                    <Route path="/todo-list/:id/" component={TodoList}/>
                                    <Route path="/todo-chat/" component={TodoChat}/>
                                </Paper>
                            </div>
                        </Router>
                    </Auth>
            </Provider>
        );
    }
}

export default App;
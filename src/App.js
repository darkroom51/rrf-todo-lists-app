import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Reboot from 'material-ui/Reboot';

import Auth from './components/Auth'
import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import UserBar from './components/UserBar'

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

                              hello world

                                {/*<Route path="/" exact={true} component={Dashboard}/>*/}
                                {/*<Route path="/food-list" component={FoodList}/>*/}
                            </div>
                        </Router>
                    </Auth>
            </Provider>
        );
    }
}

export default App;
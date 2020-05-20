import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";

import PrivateRoute from "./common/PrivateRoute";

import Header from "./layout/Header";
import Welcome from "./front/Welcome";
import Login from "./users/Login";
import Register from "./users/Register";
import Dashboard from "./users/Dashboard";
import Update from "./users/Update";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert Options
const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={Welcome} />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/admin"
                                        component={Dashboard}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/admin/user/update"
                                        component={Update}
                                    />
                                    <Redirect to="/" />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

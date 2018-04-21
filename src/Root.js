import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SocketClient from './pages/SocketClient';
import InsertQuestion from './pages/InsertQuestion';
import StatusInfo from './pages/StatusInfo';
import NotFound from './pages/NotFound';
class Root extends Component {
    constructor() {
        super();
        this.state = {
            heading: "A Wrong Place To Be In!!",
        }
    }
    componentDidMount() {

    }
    change(heading) {
        this.setState({
            heading
        })
    }

    render() {
        return (
            <Router>
                <div style={{ height: '100%', width: '100%' }}>
                    <header className="App-header">
                        <h1 className="App-title">{this.state.heading}</h1>
                    </header>
                    <ul >
                        <Link to="/jioplay/socket">
                            <li
                                className={this.state.heading === "Socket Client" ? "liActive" : "li"}
                            >
                                Socket Client
                            </li>
                        </Link>
                        <Link to="/jioplay/insert">
                            <li
                                className={this.state.heading === "Insert Questions" ? "liActive" : "li"}
                            >
                                Insert Questions
                            </li>
                        </Link>
                        <Link to="/jioplay/status">
                            <li
                                className={this.state.heading === "Status Info" ? "liActive" : "li"}
                            >
                                Status Info
                            </li>
                        </Link>
                    </ul>
                    <div className="b">
                        <Switch>
                            <Route
                                exact path="/jioplay/socket"
                                render={(props) => <SocketClient {...props} change={(val) => this.change(val)} />}
                            />
                            <Route
                                path="/jioplay/insert"
                                render={(props) => <InsertQuestion {...props} change={(val) => this.change(val)} />}
                            />
                            <Route
                                path="/jioplay/status"
                                render={(props) => <StatusInfo {...props} change={(val) => this.change(val)} />}
                            />
                            <Route
                                path="/"
                                render={(props) => <NotFound {...props} />}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Root;


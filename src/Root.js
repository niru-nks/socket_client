import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SocketClient from './pages/SocketClient';
import InsertQuestion from './pages/InsertQuestion';
import StatusInfo from './pages/StatusInfo'
class Root extends Component {
    constructor() {
        super();
        this.state = {
            heading: "Current Status",
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
                        <a href="/">
                            <li
                                className={this.state.heading === "Socket Client" ? "liActive" : "li"}
                            >
                                Socket Client
                            </li>
                        </a>
                        <a href="/insert">
                            <li
                                className={this.state.heading === "Insert Questions" ? "liActive" : "li"}
                            >
                                Insert Questions
                            </li>
                        </a>
                        <a href="/status">
                            <li
                                className={this.state.heading === "Status Info" ? "liActive" : "li"}
                            >
                                Current Status
                            </li>
                        </a>
                    </ul>
                    <div className="b">
                        <Route
                            exact path="/"
                            render={(props) => <SocketClient {...props} change={(val) => this.change(val)} />}
                        />
                        <Route
                            path="/insert"
                            render={(props) => <InsertQuestion {...props} change={(val) => this.change(val)} />}
                        />
                        <Route
                            path="/status"
                            render={(props) => <StatusInfo {...props} change={(val) => this.change(val)} />}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default Root;


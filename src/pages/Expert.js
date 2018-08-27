import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import io from 'socket.io-client'
import JSONPretty from 'react-json-pretty';
var options = {
    hostname: "",
    port: ""
};
var socket;
var qId;
class Expert extends Component {
    constructor() {
        super();
        this.state = {
            event: "",
            message: {},
            display:[]
        }
    }
    componentDidMount() {
        this.props.change("Expert");

    }
    clear() {
        this.setState({
            message: {},
            event: ""
        })
    }
    connect() {
        this.setState({
            status: "Connecting..."
        })
        options = {
            hostname: this.state.host,
            port: this.state.port
        }
        // socket = socketCluster.create(options);
        if (options.port) {
            socket = io('http://' + options.hostname + ':' + options.port)
        } else {
            socket = io('http://' + options.hostname)
        }

        console.log(socket)
        socket.on('connect', () => {

            this.setState({
                status: "Connected!!"
            })
            socket.emit('expertConnect', {
                message: "Blaah"
            })
        })
        socket.on("question", (data) => {
            this.setState({ message: data })
        })


    }

    sendRequest() {
        let data = {
            userId: this.state.message.userId,
            content: this.state.code,
            sessionId : "5b8395023a2fec0ebe60aaf8"
        }
        socket.emit('answer', data);


    }
    render() {
        return (
            <div className="App">

                <div id="message">
                    {/* {
                        this.state.display
                    } */}
                    <div className="button" style={{ float: "right" }} onClick={() => this.clear()}>clear   <i className="fas fa-ban"></i></div>
                    <b>Endpoint: </b>{options.hostname ? options.hostname + ":" + options.port : "None"}<br />
                    <b>Status: </b>{this.state.status
                        ? <span>
                            {this.state.status + " "}
                            {this.state.status === "Connecting..."
                                ? <i className="fas fa-sync fa-spin"></i>
                                : <i className="fas fa-hand-spock"></i>
                            }
                        </span>
                        : <span>
                            None
                                </span>
                    }
                    <br />
                    <b>Event Name: </b>{this.state.event} <br /><br />
                    <b>Message </b><br />

                    <JSONPretty id="json-pretty" json={this.state.message}></JSONPretty>
                </div>
                <div className="socket-left">
                    <div className="button" style={{ float: "right" }} onClick={() => this.connect()}>Connect <i className="fas fa-paper-plane"></i></div>
                    <b>Enter Host Name or IP</b><input type="text" name="hostname" onChange={(e) => { this.setState({ host: e.target.value }) }}></input><br />
                    <b>Enter Port</b><input type="text" onChange={(e) => { this.setState({ port: e.target.value }) }}></input><br />
                    {/* <b>Enter UserId</b><input type="text" name="userId" onChange={(e) => { this.setState({ userId: e.target.value }) }}></input><br /> */}
                    <hr />
                    <b>Submit Answer</b><input type="text" onChange={(e) => { this.setState({ code: e.target.value }) }}></input>
                    <div className="button" onClick={() => this.sendRequest()}>Submit <i className="fas fa-check"></i></div>
                </div>
            </div>
        );
    }
}

export default Expert;
import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import JSONPretty from 'react-json-pretty';
var options = {
    hostname: "",
    port: ""
};
var socket;

var qId;
class SocketClient extends Component {
    constructor() {
        super();
        this.state = {
            event: "",
            message: {}
        }
    }
    componentDidMount() {
        this.props.change("Socket Client");

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
        socket = socketCluster.create(options);
        console.log(socket)
        socket.on('connect', () => {
            this.setState({
                status: "Connected!!"
            })
            socket.emit('onConnect', {
                mobileNo: "99999999999",
                deviceId: "nks"
            })
        })
        socket.on('toSubscribe', (data) => {
            console.log("subscribe channel", data);
            this.setState({
                event: "toSubscribe",
                message: JSON.stringify(data)
            })
            socket.subscribe(data.channelName).watch((mes) => {
                console.log(mes, "---this is data");
                this.setState({
                    event: "On " + data.channelName + " channel",
                    message: JSON.stringify(mes)
                })
                if (mes.eventName === "onQuestion")
                    qId = mes.data.questions.id;


            });

        })
        socket.on('message', (data) => {
            // console.log(data,"this is it---")
        })
    }

    sendRequest() {
        let ans = {
            "event": "winit_answer_submit",
            "mobileNo": "99999999999",
            "timestamp": 23032018,
            "data": {
                "eventId": "WinIt1",
                "gameId": 1,
                "answers": {
                    "questionId": qId,
                    "optionId": this.state.code,
                    "questionNo": 1
                }
            }
        }
        socket.emit('onAnswerSubmit', ans);
        // this.setState({ message: ans[0] })

    }

    render() {
        return (
            <div className="App">

                <div id="message">
                    <div className="button" style={{ float: "right" }} onClick={() => this.clear()}>clear   <i className="fas fa-ban"></i></div>
                    Endpoint: {options.hostname ? options.hostname + ":" + options.port : "none"}<br />
                    Status:{this.state.status ? this.state.status : "none"}<br />
                    Event Name: {this.state.event} <br /><br />
                    Message <br />

                    <JSONPretty id="json-pretty" json={this.state.message}></JSONPretty>
                </div>
                <div className="socket-left">
                    <div className="button" style={{ float: "right" }} onClick={() => this.connect()}>Connect <i className="fas fa-paper-plane"></i></div>
                    Enter Host Name or IP<input type="text"  onChange={(e) => { this.setState({ host: e.target.value }) }}></input><br />
                    Enter Port<input type="text"  onChange={(e) => { this.setState({ port: e.target.value }) }}></input><br />
                    <hr />
                    Submit Answer<input type="text"  onChange={(e) => { this.setState({ code: e.target.value }) }}></input>
                    <div className="button" onClick={() => this.sendRequest()}>Submit <i className="fas fa-check"></i></div>



                </div>
            </div>
        );
    }
}

export default SocketClient;
import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import '../css/socketClient.css';
import JSONPretty from 'react-json-pretty';
var options = {
    // hostname: "10.130.33.163",
    hostname:"scluster.media.jio.com",
    // hostname: "127.0.0.1",
    // port: 8001,
    port: 80
};
var socket = socketCluster.create(options);
console.log(socket)

var qId;
class SocketClient extends Component {
    constructor() {
        super();
        this.state = {
            event: "",
            message: {}
        }
    }

    componentWillMount() {
        this.props.change("Socket Client");
    }

    componentDidMount() {

        socket.on('connect', () => {
            console.log("connected");
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
        socket.on('message',(data)=>{
            console.log(data)
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
        // this.setState({ message: ans })

    }
   
    render() {
        return (
            <div className="App">
                <div id="message">
                    Event Name: {this.state.event} <br /><br />
                    Message <br />
                    <JSONPretty id="json-pretty" json={this.state.message}></JSONPretty>
                </div>
                <div >

                    <input type="text" placeholder="enter code" onChange={(e) => { this.setState({ code: e.target.value }) }}></input>
                    <input type="button" value="Submit" onClick={() => this.sendRequest()}></input>
                </div>
            </div>
        );
    }
}

export default SocketClient;


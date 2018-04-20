import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import '../css/socketClient.css';
import JSONPretty from 'react-json-pretty';
var options = {
    // hostname: "10.130.33.163",
    // hostname:"jiowin.media.jio.com",
    // hostname:"10.139.50.117",
    // hostname:"scluster.media.jio.com",
    hostname: "127.0.0.1",
    // port: 8001,
    // port: 8000
    port: 3002
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

    componentWillMount() {
        this.props.change("Socket Client");
    }

    componentDidMount() {

        // socket.on('connect', () => {
        //     console.log("connected");
        //     socket.emit('onConnect', {
        //         mobileNo: "99999999999",
        //         deviceId: "nks"
        //     })
        // })
        // socket.on('toSubscribe', (data) => {
        //     console.log("subscribe channel", data);
        //     this.setState({
        //         event: "toSubscribe",
        //         message: JSON.stringify(data)
        //     })
        //     socket.subscribe(data.channelName).watch((mes) => {
        //         console.log(mes, "---this is data");
        //         this.setState({
        //             event: "On " + data.channelName + " channel",
        //             message: JSON.stringify(mes)
        //         })
        //         if (mes.eventName === "onQuestion")
        //             qId = mes.data.questions.id;


        //     });

        // })
        // socket.on('message',(data)=>{
        //     console.log(data)
        // })
    }
    connect(){
        options = {
            hostname:this.state.host,
            port:this.state.port
        }
        socket = socketCluster.create(options);
        console.log(socket)
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
            this.setState({
                event: 'onMessage',
                message: JSON.stringify(data)
            })
            console.log(data,"this is it---")
        })
    }
    emit(){
        socket.emit("msg",{"Yo":"nks"})
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
                    Connected to: {options.hostname+":"+options.port}<br />
                    Event Name: {this.state.event} <br /><br />
                    Message <br />
                    <JSONPretty id="json-pretty" json={this.state.message}></JSONPretty>
                </div>
                <div >
                    <input type="text" placeholder="Enter Host Name" onChange={(e) => { this.setState({ host: e.target.value }) }}></input>
                    <input type="text" placeholder="Enter Port" onChange={(e) => { this.setState({ port: e.target.value }) }}></input>
                    <input type="button" value="Connect" onClick={() => this.connect()}></input><br />

                    <input type="text" placeholder="enter code" onChange={(e) => { this.setState({ code: e.target.value }) }}></input>
                    <input type="button" value="Submit" onClick={() => this.sendRequest()}></input>


                    <input type="button" value="Emit" onClick={() => this.emit()}></input><br />
                </div>
            </div>
        );
    }
}

export default SocketClient;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import axios from 'axios';
let socket={};

class App extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            code:""
        }
    }
    componentDidMount() {
        // socket = io.connect("https://signage.media.jio.com",{resource:'/socket'});
        socket = io.connect("http://localhost:3001");
        socket.on('message', msg => {
            console.log(msg,"-----")
            // socket.emit('devId', { devId: 200 });
            socket.on(200, (mesg) => {
                this.setState({ message: mesg })
                console.log(mesg);
            })
        });
    }
    sendRequest() {
        let thisR=this;
        console.log("in sendRequest")
        socket.emit('answer','np')
        // axios({
        //     method:'get',
        //     url:"http://localhost:3001/get",
        //     headers:{"Content-Type":"application/json",code:this.state.code},
        // })
        // .then(function (response) {
        //     console.log(response);
        //     if(response.data.statusCode===200){
        //         thisR.setState({message:"Nice!!!!! DeviceId is :"+response.data.message})
        //     }else{
        //         alert("Code does not match with db")
        //     }
            
        // });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>

                </header>
                <p className="App-intro">
                    DeviceId is 200
                </p>
                <p style={{ color: 'red' }}>{this.state.message}</p>

                <input type="text" placeholder="enter code" onChange={(e) => { this.setState({ code: e.target.value }, () => { console.log(this.state.code) }) }}></input>
                <input type="button" value="Done" onClick={() => this.sendRequest()}></input>


            </div>
        );
    }
}

export default App;


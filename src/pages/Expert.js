import React, { Component } from 'react';
// import socketCluster from 'socketcluster-client';
import io from 'socket.io-client'
// import JSONPretty from 'react-json-pretty';
import MessageElement from '../components/MessageElement'
var options = {
    hostname: "",
    port: ""
};
var socket;
// var qId;
class Expert extends Component {
    constructor() {
        super();
        this.state = {
            event: "",
            message: {},
            sessionId: {
                "nks": "adfsadfasdfasdff",
                "sumit": "dfgsdffdfdafadfdf"
            },
            data: {
                // "nks": [
                //     {
                //         userId: "nks",
                //         content: "Hi! how are you?",
                //         sessionId: "5b8395023a2fec0ebe60aaf8"
                //     },
                //     {
                //         userId: "expert",
                //         content: "I am fine",
                //         sessionId: "5b8395023a2fec0ebe60aaf8"
                //     },
                //     {
                //         userId: "nks",
                //         content: "How is life?",
                //         sessionId: "5b8395023a2fec0ebe60aaf8"
                //     }
                // ],
                // "sumit": [
                //     {
                //         userId: "sumit",
                //         content: "yo",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     },
                //     {
                //         userId: "expert",
                //         content: "what yo asdfsdf adsfsfasdf asdfasdfasdf asdfasdfasdf asdfasdf",
                //         sessionId: "5b8395023a2fec0ebe60aaf9"
                //     }
                // ]
            }
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
            console.log("done")
            this.setState({
                status: "Connected!!"
            })
            socket.emit('expertConnect', {
                message: "Blaah"
            })
        })
        socket.on("question", (data) => {
            console.log('this is question data',data);
            this.gotQuestions(data);
        })


    }
    gotQuestions(data) {
        let keys = Object.keys(this.state.data);
        let messageData = { ...this.state.data };

        if (!this.state.data[data.userId]) {
            messageData[data.userId] = [{ ...data }]
            if (keys.length == 0) {
                this.setState({ userId: data.userId })
            }
            let sessionId = { ...this.state.sessionId, [data.userId]: data.sessionId };
            this.setState({
                sessionId
            })
        } else {
            messageData[data.userId] = [...messageData[data.userId], data]
        }
        this.setState({
            data: messageData
        })
    }
    sendRequest() {
        let data = {
            userId: "expert",
            content: this.state.code,
            sessionId: this.state.sessionId[this.state.userId]
        }
        socket.emit('answer', {...data});
        let messageData = { ...this.state.data };
        messageData[this.state.userId] = [...messageData[this.state.userId], {...data,userId:"expert"}]
        this.setState({
            data: messageData
        })

    }
    renderMessages() {

        // let keys = Object.keys(this.state.data);
        // let renderArray = [];
        // for (let i = 0; i < keys.length; i++) {
        //     renderArray.push(<MessageElement data={this.state.data[keys[i]]} key={keys[i]} />)
        // }
        // return renderArray;
        let userId = this.state.userId;
        if (userId)
            return <MessageElement data={this.state.data[userId]} keyId={userId} />
        else
            return <div><b>No chats to display</b></div>;
    }

    renderUsers() {
        let users = Object.keys(this.state.data);
        return users.map((element, i) => {
            return <option key={element} value={element}>{element}</option>
        })
    }
    render() {
        return (
            <div className="App">

                <div id="message">
                    {
                        this.renderMessages()
                    }
                    <input type="text" onChange={(e) => { this.setState({ code: e.target.value }) }}></input>
                    <div className="button" onClick={() => this.sendRequest()}>Submit <i className="fas fa-check"></i></div>
                    {/* <div className="button" style={{ float: "right" }} onClick={() => this.clear()}>clear   <i className="fas fa-ban"></i></div>
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

                    <JSONPretty id="json-pretty" json={this.state.message}></JSONPretty> */}
                </div>
                <div className="socket-left">
                    <div className="button" style={{ float: "right" }} onClick={() => this.connect()}>Connect <i className="fas fa-paper-plane"></i></div>
                    <b>Enter Host Name or IP</b><input type="text" name="hostname" onChange={(e) => { this.setState({ host: e.target.value }) }}></input><br />
                    <b>Enter Port</b><input type="text" onChange={(e) => { this.setState({ port: e.target.value }) }}></input><br />
                    {/* <b>Enter UserId</b><input type="text" name="userId" onChange={(e) => { this.setState({ userId: e.target.value }) }}></input><br /> */}
                    <hr />
                    {/* <b>Submit Answer</b><input type="text" onChange={(e) => { this.setState({ code: e.target.value }) }}></input> */}

                    <b>Select User</b>
                    <select onChange={(e) => { this.setState({ userId: e.target.value }) }}>
                        {
                            this.renderUsers()
                        }
                    </select>
                </div>
            </div>
        );
    }
}

export default Expert;
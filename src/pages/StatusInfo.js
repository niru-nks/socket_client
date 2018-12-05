import React, { Component } from 'react';
// import socketCluster from 'socketcluster-client';
import axios from 'axios';
// import moment from 'moment';
let obj = {};
class StatusInfo extends Component {
    constructor() {
        super();
        this.state = {
            date: "",
            gameId: ""
        }
    }

    componentDidMount() {
        this.props.change("Status Info");
    }
    getInfo() {
        axios({
            method: 'POST',
            url: "http://127.0.0.1:3001/things/",
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            console.log(response, "asdfghjkl;")

        }).catch((err) => {
            console.log(err, "err")
        })

    }
    sendRequest() {
        clearTimeout(obj[this.state.sessionId])
        obj[this.state.sessionId] = setTimeout((argument) => {
            console.log("done", argument);
            clearTimeout(obj[argument]);
            delete obj[argument];
        }, 5000, this.state.sessionId)
        console.log(obj)
    }
    showValue() {
        console.log(obj)
    }
    render() {
        return (
            <div className="App">

                {/* Enter Date to get Info:
                    <input type="date" className = "date" onChange={(e) => this.setState({ date: e.target.value })} required></input>
                    <div className = "button" onClick ={()=>this.getInfo()}>Get Game id's</div> */}
                <div id="message">
                    Message:

                </div>
                <div className="socket-left">
                    {/* <b>Database type:</b>
                    <select>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select> */}
                    <b>
                        Enter Some sessionId :-
                    </b>
                    <input type="text" name="hostname" onChange={(e) => { this.setState({ sessionId: e.target.value }) }}></input> <br />
                    <b>
                        Click Me--->
                    </b>
                    <div className="button" onClick={() => this.sendRequest()}>Submit <i className="fas fa-check"></i></div>
                    <div className="button" onClick={() => this.showValue()}>Show value <i className="fas fa-check"></i></div>
                </div>

            </div>
        );
    }
}

export default StatusInfo;


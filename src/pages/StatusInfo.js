import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import axios from 'axios';
import moment from 'moment';

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
                    <b>Database type:</b>
                    <select>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>

                </div>

            </div>
        );
    }
}

export default StatusInfo;


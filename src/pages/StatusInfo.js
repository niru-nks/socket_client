import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';
import axios from 'axios';
import moment from 'moment';
import '../css/statusInfo.css';

class StatusInfo extends Component {
    constructor() {
        super();
        this.state = {
            date:"",
            gameId:""
        }
    }

    componentDidMount() {
        this.props.change("Status Info");
    }
    getInfo(){
        const date = moment(this.state.date);
        console.log(date.format('DDMMYYYY'))
        axios({
            method: 'GET',
            url: "http://127.0.0.1:6382/apis/v1/redisdb/get",
            headers: { "Content-Type": "application/json",data:"asdfasdf" },
        }).then((response) => {
            console.log(response,"asdfghjkl;")

        }).catch((err) => {
            console.log(err,"err")
        })
        
    }
    render() {
        return (
            <div className="App">
                <div className="container">
                    Enter Date to get Info:
                    <input type="date" className = "date" onChange={(e) => this.setState({ date: e.target.value })} required></input>
                    <input type ="button" className = "button" value="Get Game id's" onClick ={()=>this.getInfo()}></input>
                </div>
            </div>
        );
    }
}

export default StatusInfo;


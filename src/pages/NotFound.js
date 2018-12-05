import React, { Component } from 'react';
// import socketCluster from 'socketcluster-client';
// import axios from 'axios';
// import moment from 'moment';

class StatusInfo extends Component {
    constructor() {
        super();
        this.state = {
            date: "",
            gameId: ""
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="circle top"></div>
                    <div className="circle bottom"></div>
                    <div className="error">404</div>
                    <div className="content">You have come to the wrong place... You should not be here!!    </div>
                    <div className="content">Click on one of the links in the left  <i className="fas fa-hand-point-left"></i></div>
                </div>
            </div>
        );
    }
}

export default StatusInfo;


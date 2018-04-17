import React, { Component } from 'react';
import socketCluster from 'socketcluster-client';

class StatusInfo extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    
    componentWillMount() {
        this.props.change("Status Info");
    }
    
    render() {
        return (
            <div className="App">
                
            </div>
        );
    }
}

export default StatusInfo;


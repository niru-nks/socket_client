import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from 'react-calendar-timeline/lib'
import moment from 'moment'

const groups = [
  {id: 1, title: 'group 1'},
  {id: 2, title: 'group 2'}
]
const sch={
  "1511458200": {
    "playlistId": "k0Y",
    "playlistName": "Jio",
    "startTime": "1511458200",
    "endTime": "1511461800"
  },
  "1511935320": {
    "playlistId": "k0Y",
    "playlistName": "Jio",
    "startTime": "1511935320",
    "endTime": "1511980200"
  },
  "NaN": {
    "playlistId": "k0Y",
    "playlistName": "Jio",
    "startTime": "NaN",
    "endTime": "NaN"
  }
}
const items = [
  {id: 1, group: 1, title: 'item 1', start_time: moment.unix(1511458200), end_time: moment().add(1, 'hour')},
  {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
  {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Timeline groups={groups}
              sidebarContent={<div>Above The Left</div>}
              items={items}
              defaultTimeStart={moment().add(-12, 'hour')}
              defaultTimeEnd={moment().add(12, 'hour')}
        />

      </div>
    );
  }
}

export default App;


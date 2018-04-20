import React, { Component } from 'react';
import '../css/insertQuestions.css'
import axios from 'axios';

class InsertQuestion extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            code: "",
            display: false
        }
    }
    componentDidMount() {
        this.props.change("Insert Questions")
    }
    insert() {
        let data = {
            "data": {
                "questionNo": this.state.qNo,
                "question": {
                    "en": this.state.question
                },
                "options": [
                    {
                        "id": "a",
                        "desc": { "en": this.state.a }
                    },
                    {
                        "id": "b",
                        "desc": { "en": this.state.b }
                    },
                    {
                        "id": "c",
                        "desc": { "en": this.state.c }
                    }
                ],
                "duration": 10,
                "answer": this.state.ans,
                "eventId": "Winit1",
                "timestamp": 23032018,
                "gameId": 1
            }
        }
        console.log("data to be set", data)
        axios({
            method: 'POST',
            url: "http://10.139.50.117:6382/apis/v1/insertquestions/insertquestions",
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((response) => {
            console.log(response,"asdfghjkl;")

        }).catch((err) => {
            console.log(err,"err")
        })



    }
    render() {
        return (
            <div className="container">
                <div id="question-form">
                    <span id="title">Enter Question</span> <br /><br />
                    <input
                        style={{ width: '45%' }}
                        type="number"
                        placeholder="Question No"
                        onChange={(e) => { this.setState({ qNo: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="timestamp"
                        onChange={(e) => { this.setState({ ts: e.target.value }) }}
                    ></input>
                    <input
                        type="text"
                        placeholder="Question"
                        onChange={(e) => { this.setState({ question: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="option a"
                        onChange={(e) => { this.setState({ a: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="option b"
                        onChange={(e) => { this.setState({ b: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="option c"
                        onChange={(e) => { this.setState({ c: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="Answer"
                        onChange={(e) => { this.setState({ ans: e.target.value }) }}
                    ></input>
                    <input
                        style={{ width: '45%' }}
                        type="text"
                        placeholder="gameId"
                        onChange={(e) => { this.setState({ gameId: e.target.value }) }}
                    ></input>
                    <div 
                        className="submit-button"
                        onClick={() => this.insert()}
                    >
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

export default InsertQuestion;


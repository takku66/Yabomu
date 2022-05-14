import './App.css';
import React, { Component } from 'react';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      name: ''
    };
  }

  fetchTodo = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/todolist/1628434631798000002";
		fetch(url,{
      //			credentials: "same-origin",
          method: "GET",
          headers: {
            "charset"		: "UTF-8",
            "Content-Type"	: "application/json",
            "Access-Control-Allow-Origin" : "*",
          },
        }).then((res)=>{
          if(!res.ok){
            throw new Error(`${res.status}${res.statusText}`);
          }
          console.log(res);
          return res.text();
        }).then((data)=>{
          console.log(data);
        }).catch((reason)=>{
          console.log(reason);
        });
  }


  render() {
    const { todos } = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <form method="get">
          <button
            className="App-link"
            onClick={this.fetchTodo}
            >
            Learn React
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => <li key={index}>
            {todo}
          </li>)}
        </ul>
      </header>
    </div>
    );
  };
}


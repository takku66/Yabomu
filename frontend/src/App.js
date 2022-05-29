// import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';


class App extends React.Component {

  render(){

    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/spa/" element={<Login />} />
          <Route exact path="/spa/Login" element={<Login />} />
          <Route exact path="/spa/TodoList" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
      )
    }
 }

export default  App;
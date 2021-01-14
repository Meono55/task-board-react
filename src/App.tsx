import React from 'react';
import TaskBoard from './components/task-board/task-board'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {

  return (
    <Router>
      <TaskBoard></TaskBoard>
    </Router>
  )
}


export default App;

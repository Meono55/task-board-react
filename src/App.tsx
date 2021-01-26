import React from 'react';
import TaskBoard from './components/task-board/task-board'
import Login from './components/login/Login'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import TaskDetailPage from './components/task-details-page/TaskDetailsPage';

function App() {
  

  return (
    <Router>
      <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/taskboard" component={TaskBoard}/>
      <Route path="/details/:id" component={TaskDetailPage} />
      </Switch>
    </Router>
  )
}


export default App;

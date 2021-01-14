import React from 'react';
import TaskBoard from './components/task-board/task-board'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import TaskDetailPage from './components/task-details-page/TaskDetailsPage';

function App() {

  return (
    <Router>
      <Switch>
      <Route path="/" exact component={TaskBoard}/>
      <Route path="/details/:title" component={TaskDetailPage} />
      </Switch>
    </Router>
  )
}


export default App;

import React from 'react';
import TaskBoard from './components/task-board/task-board'
import Login from './components/login/Login'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import TaskDetailPage from './components/task-details-page/TaskDetailsPage';
import Register from './components/register/Register';

function App() {
  

  return (
    <Router>
      <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/taskboard" component={TaskBoard}/>
      <Route path="/details/:id" component={TaskDetailPage} />
      <Route path="/" exact>
        <Redirect to="/login"/>
      </Route>
      <Route path="/register" component={Register}/>
      </Switch>
    </Router>
  )
}


export default App;

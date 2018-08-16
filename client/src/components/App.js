import React, { Component } from 'react';

import '../styles/App.css'
import Home from './Home'
import Dashboard from './Dashboard'
import Exercises from './Exercises'
import Exercise from './Exercise'
import { Router, Link } from "@reach/router";

const NavLink = props => (
  <Link
  {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? "red" : "blue"
        }
      };
    }}
  />
);

class App extends Component {
  render() {
    return(
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          {' '}
          <NavLink to="dashboard">Dashboard</NavLink>
          {' '}
          <NavLink to="api/exercise">Exercise</NavLink>
          {' '}
          <NavLink to="api/exercises/newUser">User</NavLink>
          {' '}
          <NavLink to="api/exercises/add">Add Exercise</NavLink>
          {/* {props.children} */}
        </nav>
        <Router>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <Exercise path="api/exercises/:newUser" />
        </Router>
      </div>
    );
  }
}

export default App;
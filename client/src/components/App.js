import React, { Component } from 'react';
import {Position} from 'rebass';
import posed, { PoseGroup } from 'react-pose';

import '../styles/App.css'
import Home from './Home'
import Dashboard from './Dashboard'
import Exercises from './Exercises'
import Exercise from './Exercise'
import { Router, Link, Location } from "@reach/router";

const RouteContainer = posed.div({
  enter: {opacity: 1, delay: 300, beforeChildren: true},
  exit: {opacity: 0}
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
    <PoseGroup>
      <RouteContainer key={location.key}>
        <Router location={location}>{children}</Router>
      </RouteContainer>
    </PoseGroup>
    )}
  </Location> 
);

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
        <div
          p={3}
          bg='#eee'
          position='relative'>

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
        </div>
        <nav>
        </nav>
        {/* <Router> */}
        <PosedRouter>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <Exercise path="api/exercises/:newUser" />
        </PosedRouter>
        {/* </Router> */}
      </div>
    );
  }
}

export default App;
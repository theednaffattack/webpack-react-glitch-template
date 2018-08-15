import React, { Component } from 'react';

import '../styles/App.css'
import Home from './Home'
import Dashboard from './Dashboard'
import { Router, Link } from "@reach/router";



class App extends Component {
  render() {
    return(
      <div>
      <nav>
        <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router>
        <Home path="/" />
        <Dashboard path="dashboard" />
      </Router>
      </div>
    );
  }
}

export default App;
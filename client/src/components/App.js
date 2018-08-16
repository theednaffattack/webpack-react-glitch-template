import React, { Component } from 'react';

import '../styles/App.css'
import Home from './Home'
import Dashboard from './Dashboard'
import Exercises from './Exercises'
import Exercise from './Exercise'
import { Router, Link } from "@reach/router";
import {
  Provider,
  Container,
  Heading,
  Blockquote,
  Toolbar,
  // NavLink,
  Flex,
  Box
} from 'rebass';

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
      

    <Provider>
    <Heading is='h1' children='Next.js + Rebass' mb={3}  />

    <Container>
      <Toolbar bg='black'>
          <NavLink to="/">Home</NavLink>
          {' '}
          <NavLink to="dashboard">Dashboard</NavLink>
          {' '}
          <NavLink to="api/exercise">Exercise</NavLink>
          {' '}
          <NavLink to="api/exercises/newUser">User{' '}</NavLink>
          {' '}
          <NavLink to="api/exercises/add">Add Exercise</NavLink>
          {/* {props.children} */}
      </Toolbar>

      <Flex justify='center'>
        <Box width={1 / 2}>
          <Blockquote fontSize={3} py={4}>
            "Next.js is a minimalistic framework for server-rendered React applications."
          </Blockquote>
        </Box>
        <Box width={6 / 12}>
          <Blockquote fontSize={3} py={4}>
            "Functional React UI component library, built with styled-components"
          </Blockquote>
        </Box>
      </Flex>
    </Container>
  </Provider>
    );
  }
}

export default App;

{/* <div>
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
         
        </nav>
        <Router>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <Exercise path="api/exercises/:newUser" />
        </Router>
      </div> */}
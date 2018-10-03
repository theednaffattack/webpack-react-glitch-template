import React, { Component } from "react";
import { Box, Flex, Heading, Position, Provider } from "rebass";
import posed, { PoseGroup } from "react-pose";
import { Router, Link, Location } from "@reach/router";
import { injectGlobal, styled } from "styled-components";

import theme from "../styles/theme";
import "../styles/App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Exercises from "./Exercises";
import { UsersFuzzy } from "./UsersFuzzy";
import AddExercise from "./AddExercise";
import AddUsers from "./AddExercise";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { DemoCheckbox } from "../example/formikCheckbox";
import { FuseReact } from "../example/FuseReactAdapted";
import { AllUsers } from "../example/QueryUsers";



const domain="madison-reed.com";
const orderBy="familyName";
const maxResults=200;

const searchObj = {
  domain,
  orderBy,
  maxResults
}

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0;
    height: 100vh; }
  #root {
    height: 100vh;
  }
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
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
    return (
      <Provider theme={theme}>
        <Flex bg="violet" m={0}>
          <Box flex={1} color="text" bg="violet">
            <Box flex={1} px={4} py={2} color="text" bg="gray">
              <Heading color="blue">people manager</Heading>
              {/* <nav p={3} bg="#eee" position="relative"> */}
              <NavLink to="/">Home</NavLink>{" "}
              <NavLink to="dashboard">Dashboard</NavLink>{" "}
              <NavLink to="api/users">Users</NavLink>{" "}
              <NavLink to="api/users/newUser">Add User</NavLink>{" "}
              <NavLink to="api/users/editUser">Edit User</NavLink>{" "}
              <NavLink to="fuse">Fuzzy User Search Demo</NavLink>{" "}
              {/* <NavLink to="api/demo">Checkbox Demo</NavLink>{" "} */}
              {/* <NavLink to="api/exercise">Exercise</NavLink>{" "}
              <NavLink to="api/exercises/newUser">User</NavLink>{" "}
              <NavLink to="api/exercises/add">Add Exercise</NavLink> */}
            </Box>
            {/* </nav> */}
            <PosedRouter>
              <Home path="/" />
              <Dashboard path="dashboard" />
              <AllUsers path="api/users" />
              <AddUser path="api/users/newUser" />
              {/* <EditUser path="api/users/editUser" /> */}
              <EditUser path="api/users/edit/:userId" />
              <DemoCheckbox path="api/demo" />
              <AllUsers domain={domain} orderBy={orderBy} maxResults={maxResults} path="fuse" />
            </PosedRouter>
          </Box>
        </Flex>
      </Provider>
    );
  }
}

export default App;

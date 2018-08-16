import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";

import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: green;
`;

const Exercises = (props) => (
  <div>
    <StyledH1>Exercises Plural Dashboard </ StyledH1>
    <p>I'm the parent route Exercises and Component Exercises</p>
    {props.children}
  </div>
);

export default Exercises;
import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";

import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: green;
`;

const Exercise = (props) => (
  <div>
    <StyledH1>Exercise Dashboard </ StyledH1>
    <p>And I'm the child Component `Exercise`</p>
    {props.newUser}
  </div>
);

export default Exercise;
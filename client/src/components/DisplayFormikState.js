import React from "react";
import { Pre } from "rebass";
import styled from "styled-components";

const RoundedPre = styled(Pre)`
  border-radius: 10px;
`;

const DisplayFormikState = props => (
  <RoundedPre
    p={3}
    m={[0, 1, 2]}
    bg="darken"
    fontSize={2}
    children={JSON.stringify(props, null, 2)}
  />
);

export default DisplayFormikState;

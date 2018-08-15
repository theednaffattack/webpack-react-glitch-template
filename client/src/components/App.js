import React, { Component } from 'react';
import styled from 'styled-components'

import '../styles/App.css'

const StyledH1 = styled.h1`
  color: green;
`;

class App extends Component {
  render() {
    return(
      <div>
        <h1>This is CSS</h1>
        <StyledH1>This is CSS-in-JS </ StyledH1>
      </div>
    );
  }
}

export default App;
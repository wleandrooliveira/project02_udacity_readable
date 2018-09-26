import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react';

class AppTitle extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
      <Container>
        <h1>BlogUdacity</h1>
      </Container>
      </Menu>
      
    )
  }
}


export default AppTitle;

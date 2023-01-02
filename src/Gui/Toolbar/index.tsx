import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";

export default class ToolBarBase extends Component {
  render() {
    return (
      <>
        <Navbar
          expand="lg"
          variant="light"
          bg="light"
          style={{ width: "60px" }}
        >
          <Button onClick={this.props.onShow}>show</Button>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Navbar>
      </>
    );
  }
}

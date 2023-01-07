import "./styles.scss";
import {Sidebar} from "./Gui/Sidebar";
import ToolBarBase from "./Gui/Toolbar";
import Layout from "./Gui/Layout";
import { Row, Col, Button } from "react-bootstrap";
import React, { Component } from "react";
class Vector {
  private _x: number = 0;
  private _y: number = 0;
  private _z: number = 0;
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  // set X(value:number):number{
  //   this._x = value
  // }
  // get X():number{
  //   return this._x
  // }
  get Length(): number {
    return 0;
  }
}
export default class App extends Component {
  resizeData: any;
  constructor(props: any) {
    super(props);
    window["Vector"] = Vector;
    this.resizeData = {
      tracking: false,
      startWidth: null,
      startCursorScreenX: null,
      handleWidth: 10,
      resizeTarget: null,
      parentElement: null,
      maxWidth: null,
    };
    this.state = {
      toggle: true,
      width: 200,
      showMobile: false,
    };
  }
  showMobile(status: any) {
    this.state.showMobile = status;
    this.setState(this.state);
  }
  onResite() {}
  render() {
    return (
      <div className="App">
        <ToolBarBase onShow={() => this.showMobile(true)} />
        <div className="container_main">
          <Sidebar
            show={this.state.showMobile}
            onHide={() => this.showMobile(false)}
          ></Sidebar>
          <main>
            {/* <GoldenTest onResize={this._event}></GoldenTest> */}
            <Layout />
          </main>
        </div>
      </div>
    );
  }
}

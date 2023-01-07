import React, { Component, ElementRef, createContext } from "react";
import { Icon } from "../../Icon";
import { Button } from "react-bootstrap";
import "./styles.scss";
import {
  PropsHeader,
  StateHeader,
  PropsTabBase,
  StateTabBase
} from "../Interface";

function findByType(element: any, type: any): any {
  if (!element) return;
  if (element.length > 1) {
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      if (e.type.name === type.name) {
        return e;
      }
    }
  } else {
    if (element.type.name === type.name) {
      return element;
    }
  }
}

const DropdownTab = createContext({
  show: false,
  toggle: () => {}
});

class Header extends Component<PropsHeader, StateHeader> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: true
    };
  }
  render() {
    return (
      <>
        <DropdownTab.Consumer>
          {({ show, toggle }) => (
            <>
              <div className="title" onClick={toggle}>
                <div className="icon">
                  <Icon iconName={show ? "ChevronDown" : "ChevronRight"} />
                </div>
                {this.props.title}
              </div>
              <div className="tools">{show && this.props.children}</div>
            </>
          )}
        </DropdownTab.Consumer>
      </>
    );
  }
}
class Body extends Component {
  render() {
    return this.props.children;
  }
}
class TabBase extends Component<PropsTabBase, StateTabBase> {
  static Header: typeof Header = Header;
  static Body: typeof Body = Body;
  constructor(props: PropsTabBase) {
    super(props);
    this.state = {
      toggle: this.onToggle.bind(this),
      show: this.props.show || false
    };
  }
  onToggle() {
    let status = !this.state.show;
    this.setState({ show: status });
    let onToggle = this.props.onToggle;
    if (onToggle) {
      onToggle(status);
    }
  }
  render() {
    const { children } = this.props;
    var header = findByType(children, TabBase.Header);
    var body = findByType(children, TabBase.Body);
    return (
      <>
        <div className="card-slide">
          <DropdownTab.Provider value={this.state}>
            <div className="header">{header}</div>
            <div className={(this.state.show ? "show" : String()) + " body"}>
              {body}
            </div>
          </DropdownTab.Provider>
        </div>
      </>
    );
  }
}
export {
  TabBase
}
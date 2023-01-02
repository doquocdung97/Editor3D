import { Component } from "react";
interface PropsConfig {
  node: any;
}
interface StateConfig {}
export class ViewBase extends Component<PropsConfig, StateConfig> {
  private visibility: boolean = false;
  constructor(props: PropsConfig) {
    super(props);
    let node = this.props.node;
    node.setEventListener("close", this.onClone.bind(this));
    node.setEventListener("visibility", this._visibility.bind(this));
    node.setEventListener("resize", this.onResize.bind(this));
  }
  private _visibility() {
    let status = this.props.node._visible;
    this.visibility = !status;
    this.onVisibility(this.visibility);
  }
  onVisibility(status: boolean) {
    // this.visibility = status;
  }
  get Visibility(): boolean {
    return this.visibility;
  }
  onClone() {
    // console.log("onClone", this.props.node);
  }
  onResize() {
    // console.log("onResize", this.props.node);
  }
  render() {
    return <>{/* <h1>test 1</h1> */}</>;
  }
}

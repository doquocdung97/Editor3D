import { Component, createRef } from "react";
import { Layout as Flexlayout, Model } from "flexlayout-react";
import "./style.scss";
// import Constants from "../../Constants";
import { ViewBase } from "./View/index";
import LayoutService from "../Layout/service";

interface State {
  model: any;
  fileHandles: any;
}
export default class Layout extends Component<{}, State> {
  layoutRef: any;
  constructor(props: any) {
    super(props);
    this.layoutRef = createRef();
    this.state = {
      model: Model.fromJson(LayoutService.getConfig()),
      fileHandles: {}
    };
    LayoutService.init(this);
  }
  factory(node: any) {
    let component = node.getComponent();
    var layouts = LayoutService.getLayouts();
    var Layout = layouts[component];
    if (Layout) {
      return <Layout node={node} />;
    } else {
      return <ViewBase node={node} />;
    }
  }
  createTabs(component: any) {
    this.layoutRef.current.addTabToActiveTabSet(component);
  }
  // handleNewTabClick(node: any) {
  //   this.layoutRef.current.addTabToActiveTabSet({
  //     type: "tab",
  //     component: "MyComp1",
  //     name: "test-102"
  //   });
  // }
  onRenderTabSet(node: any, renderValues: any) {
    // let component = node.getComponent();
    console.log(node._children[0]);
    // renderValues.stickyButtons.push(
    //   <img
    //     src="images/add.svg"
    //     alt="Add"
    //     key="Add button"
    //     title="Add Tab (using onRenderTabSet callback, see Demo)"
    //     style={{ width: "1.1em", height: "1.1em" }}
    //     className="flexlayout__tab_toolbar_button"
    //     onClick={() => this.handleNewTabClick(node)}
    //   />
    // );
    // window.layout = this.layoutRef;
  }
  render() {
    return (
      <>
        {/* <Button onClick={this.addCompo.bind(this)}>test</Button> */}
        <div className="contents">
          <Flexlayout
            ref={this.layoutRef}
            model={this.state.model}
            factory={this.factory}
            onRenderTabSet={this.onRenderTabSet.bind(this)}
          />
        </div>
      </>
    );
  }

  componentDidMount() {}
  componentWillUnmount() {
    // if (this.layout) this.layout.destroy();
  }
}

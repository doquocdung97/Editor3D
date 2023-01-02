import { createRef } from "react";
import { ViewBase } from "../../Gui/Layout/View/index";
import LayoutService from "../../Gui/Layout/service";
import ViewHelper from "./ViewHelper";
export class View3D extends ViewBase {
  // containerRef =  createRef();
  private containerRef: React.RefObject<HTMLInputElement>;
  private view: ViewHelper;
  constructor(props: any) {
    super(props);
    this.containerRef = createRef();
    this.view = new ViewHelper();
  }
  onVisibility(status: boolean) {
    // console.log("View3D status: ", status);
    if (status) {
      let view = this.view;
      setTimeout(() => {
        view.onWindowResize();
      }, 10);
    }
  }
  componentDidMount() {
    if (
      this.containerRef.current &&
      this.containerRef.current.children.length <= 0
    ) {
      this.view.init(this.containerRef.current);
    }
  }
  onResize() {
    let view = this.view;
    setTimeout(() => {
      view.onWindowResize();
    }, 10);
  }
  render() {
    return (
      <>
        <div
          style={{ width: "100%", height: "100%" }}
          ref={this.containerRef}
        ></div>
      </>
    );
  }
}
LayoutService.addLayout("View3D", View3D);

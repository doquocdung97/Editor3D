import React, {createRef, useState, Component, useRef } from "react";

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

// import SidebarService from "../../Gui/Sidebar/service";

// import { TabBase, Icon, Button } from "../../Gui/Sidebar/Child";

// class Tab extends Component {
//   Hidden = false
//   onToggle(status:boolean){
//     let parent = this.props.parent
//     parent.setShow(status)
//   }
//   render() {
//     let parent = this.props.parent
//     return (
//       <TabBase onToggle={this.onToggle.bind(this)} show={parent.isShow()}>
//         <TabBase.Header title={parent?.Title}>
//           <Button>
//             <Icon iconName="ArrowClockwise" />
//           </Button>
//           <Button>
//             <Icon iconName="Gear" />
//           </Button>
//           <Button>
//             <Icon iconName="Bank" />
//           </Button>
//         </TabBase.Header>
//         <TabBase.Body>
//           <h1>sdfdsf 3</h1>
//         </TabBase.Body>
//       </TabBase>
//     );
//   }
// }
// class TabChild {
//   Name = 'Edit'
//   Title = 'View File'
//   Component = Tab
//   Parent
//   Hidden = true
//   show = true
//   constructor(parent) {
//     this.Parent = parent
//   }
//   isShow(){
//     return this.show
//   }
//   setShow(status:boolean){
//     this.show = status
//     console.log(status)
//   }
//   onToggle(status:boolean){
//     this.Hidden = status
//   }
// }
// class TabChild1 {
//   Name = 'Edit'
//   Title = 'View File'
//   Component = Tab
//   Parent
//   Hidden = false
//   show = true
//   constructor(parent) {
//     this.Parent = parent
//   }
//   isShow(){
//     return this.show
//   }
//   setShow(status:boolean){
//     this.show = status
//   }
//   onToggle(status:boolean){
//     this.Hidden = status
//   }
// }
// class EditorTab {
//   Children:any[] = []
//   Title = 'View 3D'
//   Name = 'View3D'
//   Icon = 'File'
//   Active = true
//   constructor() {
//     this.Children = [new TabChild(this), new TabChild1(this)]
//   }
// }
// SidebarService.addTab("View3D", EditorTab);

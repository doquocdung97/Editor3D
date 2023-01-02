import { IJsonModel } from "flexlayout-react";
class _LayoutService {
  private parent: any;
  private layouts: any = {};
  private Config: IJsonModel;
  constructor() {
    this.Config = {
      global: {},
      layout: {
        type: "row",
        // weight: 100,
        children: [
          {
            type: "tabset",
            weight: 100,
            children: [
              {
                type: "tab",
                component: "View3D",
                name: "View 3D"
              },
              {
                type: "tab",
                component: "EditorCode",
                name: "Editer"
              }
            ]
          }
        ]
      }
    };
  }
  init(parent: any) {
    this.parent = parent;
  }
  getConfig() {
    return this.Config;
  }
  onResize() {
    // this.parent.onResize();
  }
  createView(component: any) {
    this.parent.createTabs(component);
  }
  apply(data: any) {
    this.parent.setState(data);
  }
  addLayout(name: any, component: any) {
    var layout = this.layouts[name];
    if (layout) {
      throw new ErrorEvent("name already in layouts");
    }
    this.layouts[name] = component;
  }
  getViews() {
    let root = this.parent.state.model._root;
    if (root && root._children.length > 0) {
      return root._children[0]._children;
    }
  }
  getLayouts() {
    return this.layouts;
  }
}
const LayoutService = new _LayoutService();
window["LayoutService"] = LayoutService;
export default LayoutService;

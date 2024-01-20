import { IJsonModel, Model, Actions } from "flexlayout-react";
//import { Actions } from "flexlayout-react/model/Actions";
class _LayoutService {
  private parent: any;
  private layouts: any = {};
  private Config: IJsonModel;
  Actions = Actions;
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
                component: "EditorCode",
                name: "Editer",
              },
              {
                type: "tab",
                component: "Settings",
                name: "Settings",
              },
              {
                type: "tab",
                component: "View3D",
                name: "View 3D",
              },
              {
                type: "tab",
                component: "ViewFlow",
                name: "View Flow",
              },
            ],
          },
        ],
      },
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
  createView(component: any, isCheck: boolean = false) {
    if (isCheck) {
      let views = this.getViews();
      for (let i = 0; i < views.length; i++) {
        let node = views[i];
        let compo = node.getComponent();
        if (compo == component.component) {
          this.setActive(node);
          return;
        }
      }
    }
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
      let layout = [];
      for (let i = 0; i < root._children.length; i++) {
        let setnode = root._children[i];
        layout.push(...setnode._children);
      }
      return layout;
    }
  }
  getLayouts() {
    return this.layouts;
  }
  setActive(node: any) {
    this.parent.state.model.doAction(
      this.Actions.selectTab(node._attributes.id)
    );
  }
}
const LayoutService = new _LayoutService();
window["LayoutService"] = LayoutService;
export default LayoutService;

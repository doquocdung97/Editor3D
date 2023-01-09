import React, { Component } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { Icon } from "../Icon";
import Constants from "Constants";
import "./styles.scss";
import LayoutService from "../Layout/service";
import { PropsConfig, StateConfig, ResizeConfig } from "./Interface";
import SidebarService from "./service";
import { TabBase as Tab } from "./Child";
class WorkbenchBase {
  Children:any[] = [];
  Name: String = String();
  Title: String = String();
  Icon: String = String();
  #Enabled: boolean = true;
  private _enabled: boolean = true;
  Parent;
  constructor(parent: any) {
    let self = this;
    setTimeout(function () {
      let childs = self.Children;
      let new_child = [];
      for (let i = 0; i < childs.length; i++) {
        const element = childs[i]
        if(element){
          new_child.push(new element(self));
        }
      }
      self.Children = new_child;
    }, 0);
    this.Parent = parent;
  }
  get Enabled() {
    return this.#Enabled;
  }
  setEnabled(status: boolean) {
    this.#Enabled = status;
    this.update();
  }
  update() {
    this.Parent.update();
  }
  Activated() {}
}
class TabBase {
  static Base = Tab;
  static Button = Button;
  static Icon = Icon;
  Name: String = String();
  Title: String = String();
  Parent: any;
  #UI: Component;
  #Enabled: boolean = true;
  #Show: boolean = true;
  constructor(parent) {
    this.Parent = parent;
  }
  IsActive() {
    return this.#Show;
  }
  setShow(status: boolean) {
    this.#Show = status;
  }
  get Enabled() {
    return this.#Enabled;
  }
  setEnabled(status: boolean) {
    this.#Enabled = status;
    this.update();
  }
  setUI(element: Component) {
    this.#UI = element;
  }
  update() {
    this.#UI.setState({ date: new Date() });
  }
  render(): JSX.Element {
    return <></>;
  }
}
interface PropsTab {
  parent: any;
}
class TabComponent extends Component<PropsTab, {}> {
  constructor(props: PropsTab) {
    super(props);
    let parent = this.props.parent;
    parent.setUI(this);
    this.state = {
      date: new Date(),
    };
  }
  onToggle(status: boolean) {
    let parent = this.props.parent;
    parent.setShow(status);
  }
  render() {
    let parent = this.props.parent;
    if (!parent.Enabled) return;
    let Child = parent.render();
    return (
      <Tab onToggle={this.onToggle.bind(this)} show={parent.IsActive()}>
        {Child?.props.children}
      </Tab>
    );
  }
}
class Sidebar extends Component<PropsConfig, StateConfig> {
  resizeData: ResizeConfig;
  service = SidebarService;
  constructor(props: PropsConfig) {
    super(props);
    this.resizeData = {
      tracking: false,
      startWidth: 0,
      startCursorScreenX: 0,
      handleWidth: 10,
      resizeTarget: 0,
      parentElement: 0,
      maxWidth: 0,
      minReSizeWidth: 300,
      maxReSizeWidth: 500,
      width: 400,
      widthmobile: 300,
    };
    this.state = {
      ismobile: this.checkMobile(),
      toggle: true,
      date: new Date(),
    };
    this.service.init(this);
  }
  onSelectTab(item: WorkbenchBase, index: number) {
    let index_active = this.service.Active();
    let ismobile = this.checkMobile();
    let status = true;
    if (!ismobile && index_active == index) {
      index = -1;
      status = false;
    }
    this.service.setActive(index, false);
    this.setState({ toggle: status, date: new Date() });
    this.onResize();
  }
  componentDidMount() {
    let _mousemove = this.mousemove.bind(this);
    window.addEventListener("mousemove", (event) => {
      _mousemove(event);
    });
    let mouseup = this.mouseup.bind(this);
    window.addEventListener("mouseup", (event) => {
      mouseup(event);
    });
    let _resize = this.resize.bind(this);
    window.addEventListener("resize", (event) => {
      _resize(event);
    });
  }
  resize(event: any) {
    let status = this.checkMobile();
    if (status !== this.state.ismobile) {
      this.setState({ ismobile: status });
    }
  }
  checkMobile() {
    let status: boolean = false;
    if (window.innerWidth < Constants.MOBILE_SIZE) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
  mouseup(event: any) {
    if (this.resizeData.tracking) {
      this.resizeData.tracking = false;
      this.resizeData.resizeTarget.classList.add("nav");
    }
  }
  mousemove(event: any) {
    if (this.resizeData.tracking) {
      const cursorScreenXDelta =
        event.screenX - this.resizeData.startCursorScreenX;
      const newWidth = Math.min(
        this.resizeData.startWidth + cursorScreenXDelta,
        this.resizeData.maxWidth
      );
      if (
        this.resizeData.minReSizeWidth < newWidth &&
        newWidth < this.resizeData.maxReSizeWidth
      ) {
        this.resizeData.resizeTarget.style.width = newWidth + "px";
        this.resizeData.width = newWidth;
        this.onResize();
        // this._event.apply(this);
      }

      // $(this.resizeData.resizeTarget).outerWidth(newWidth);
    }

    // EventEmitter.dispatch("onResize", this);
  }
  mousedown(event: any) {
    const selectTarget = (fromElement: any, selector: any) => {
      if (!(fromElement instanceof HTMLElement)) {
        return null;
      }
      return fromElement.querySelector(selector);
    };
    if (event.button !== 0 || !this.state.toggle) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const handleElement = event.currentTarget;

    if (!handleElement.parentElement) {
      console.error(new Error("Parent element not found."));
      return;
    }

    // Use the target selector on the handle to get the resize target.
    const targetSelector = handleElement.getAttribute("data-target");
    const targetElement = selectTarget(
      handleElement.parentElement,
      targetSelector
    );

    if (!targetElement) {
      console.error(new Error("Resize target element not found."));
      return;
    }
    targetElement.classList.remove("nav");
    this.resizeData.startWidth = targetElement.clientWidth;
    this.resizeData.startCursorScreenX = event.screenX;
    this.resizeData.resizeTarget = targetElement;
    this.resizeData.parentElement = handleElement.parentElement;
    this.resizeData.maxWidth =
      handleElement.parentElement.clientWidth - this.resizeData.handleWidth;
    this.resizeData.tracking = true;
  }
  onResize() {
    setTimeout(() => {
      LayoutService.onResize();
    }, 10);
  }
  // setToggle() {
  //   let toggle = !this.state.toggle;
  //   this.setState({ toggle: toggle });
  //   this.onResize();
  // }
  onToggleTab(item: any) {
    let status = !item.Enabled;
    item.setEnabled(status);
    //this.setState({ date: new Date() });
  }
  onSetting() {
    LayoutService.createView(
      {
        type: "tab",
        component: "Settings",
        name: "Settings",
      },
      true
    );
    this.props.onHide();
  }
  render() {
    let tabs = this.service.getTabs();
    let active =
      this.checkMobile() && this.service.Active() < 0
        ? 0
        : this.service.Active();
    return (
      <>
        <div
          className={
            (this.state.ismobile && this.props.show ? "show" : "") +
            " slidebar-backdrop"
          }
          onClick={this.props.onHide}
        ></div>
        <aside
          // onResize={() => console.log("resized!")}
          className={
            (this.state.ismobile ? "nav-mobile" : "") +
            " nav " +
            (this.state.ismobile && this.props.show ? "show" : "")
          }
          style={{
            width:
              !this.state.ismobile && !this.state.toggle
                ? "auto"
                : (this.state.ismobile
                    ? this.resizeData.widthmobile
                    : this.resizeData.width) + "px",
            visibility: "visible",
          }}
        >
          <div className="toolbar-main">
            {Object.keys(tabs)?.map((key: string, index: number) => {
              let tab = tabs[key];
              if (tab.Enabled) {
                return (
                  <div className="child" key={index}>
                    <Button
                      className={index == active ? "active " : ""}
                      onClick={() => {
                        this.onSelectTab(tab, index);
                      }}
                    >
                      <Icon iconName={tab.Icon} />
                    </Button>
                  </div>
                );
              }
            })}
            <div className="child btn-bottom">
              <Button onClick={this.onSetting.bind(this)}>
                <Icon iconName="Gear" />
              </Button>
            </div>
          </div>
          <div className="toolbar-tabs">
            {Object.keys(tabs)?.map((key: string, index: number) => {
              let tab = tabs[key];
              return (
                <div
                  className={(index == active ? "active " : "") + "child"}
                  key={index}
                >
                  <div className="header">
                    <div className="title">{tab.Title}</div>
                    <div className="tools">
                      <Dropdown drop="end">
                        <Dropdown.Toggle>
                          <Icon iconName="Gear" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {tab.Children?.map((child: any, index: number) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                onClick={() => this.onToggleTab(child)}
                                className={!child.Enabled ? "hidden" : "show"}
                              >
                                {child.Enabled && <Icon iconName="Check2" />}
                                {child.Title}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* <Button
                        onClick={() => {
                          LayoutService.createView({
                            type: "tab",
                            component: "EditorCode",
                            name: "test-102"
                          });
                        }}
                      >
                        <Icon iconName="Gear" />
                      </Button> */}
                    </div>
                  </div>
                  {tab.Children?.map((child: any, index: number) => {
                    return <TabComponent parent={child} key={index} />;
                  })}
                </div>
              );
            })}
          </div>
        </aside>
        <div
          className={
            this.state.toggle && !this.state.ismobile
              ? "resize-handle--x"
              : String()
          }
          onMouseDown={this.mousedown.bind(this)}
          data-target="aside"
        ></div>
      </>
    );
  }
}
export { Sidebar, TabBase, WorkbenchBase };

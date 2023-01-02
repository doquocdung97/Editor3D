import react, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Icon } from "../Icon";
import Constants from "../../Constants";
import { TabBase } from "./Child";
import "./styles.scss";
import LayoutService from "../Layout/service";
import {
  PropsConfig,
  StateConfig,
  ResizeConfig,
  StateItemConfig,
  StateItemChildConfig
} from "./Interface";
import SidebarService from "./service";
class Tab extends Component {
  render() {
    return (
      <TabBase>
        <TabBase.Header title="test tab">
          <Button>
            <Icon iconName="ArrowClockwise" />
          </Button>
          <Button>
            <Icon iconName="Gear" />
          </Button>
          <Button>
            <Icon iconName="Bank" />
          </Button>
        </TabBase.Header>
        <TabBase.Body>
          <h1>sdfdsf</h1>
        </TabBase.Body>
      </TabBase>
    );
  }
}

export default class Sidebar extends Component<PropsConfig, StateConfig> {
  resizeData: ResizeConfig;
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
      widthmobile: 300
    };
    this.state = {
      ismobile: this.checkMobile(),
      toggle: true,
      item: [
        {
          icon: "Files",
          title: "Files",
          active: true,
          children: [
            {
              component: Tab,
              hidden: true
            },
            {
              component: Tab
            }
          ]
        },
        {
          icon: "House",
          title: "Home",
          active: false,
          children: [
            {
              component: Tab,
              hidden: true
            },
            {
              component: Tab
            },
            {
              component: Tab
            },
            {
              component: Tab
            }
          ]
        },
        {
          icon: "Gear",
          title: "Setting",
          active: false,
          children: [
            {
              component: Tab,
              hidden: true
            },
            {
              component: Tab
            }
          ]
        }
      ]
    };
    SidebarService.init(this);
  }
  onSelectTab(item: any) {
    let status = !item.active;
    this.state.item.map((element: any, index: number) => {
      element.active = false;
    });
    let ismobile = this.checkMobile();
    if (ismobile) {
      status = true;
    }
    item.active = status;
    this.setState({ toggle: status, item: this.state.item });
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

      console.log("tracking stopped");
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

    console.log("tracking started");
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
  render() {
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
            width: !this.state.toggle
              ? "auto"
              : (this.state.ismobile
                  ? this.resizeData.widthmobile
                  : this.resizeData.width) + "px",
            visibility: "visible"
          }}
        >
          <div className="toolbar-main">
            {this.state.item?.map((item: StateItemConfig, index: number) => {
              return (
                <div className="child" key={index}>
                  <Button
                    className={item.active ? "active " : ""}
                    onClick={() => {
                      this.onSelectTab(item);
                    }}
                  >
                    <Icon iconName={item.icon} />
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="toolbar-tabs">
            {this.state.item?.map((item: StateItemConfig, index: number) => {
              return (
                <div
                  className={(item.active ? "active " : "") + "child"}
                  key={index}
                >
                  <div className="header">
                    <div className="title">{item.title}</div>
                    <div className="tools">
                      <Button
                        onClick={() => {
                          LayoutService.create({
                            type: "Component",
                            title: "B Component",
                            props: { id: 20 }
                          });
                        }}
                      >
                        <Icon iconName="Gear" />
                      </Button>
                    </div>
                  </div>
                  {item.children?.map(
                    (child: StateItemChildConfig, index: number) => {
                      let Component = child.component;
                      if (!child.hidden) {
                        return <Component key={index} />;
                      }
                    }
                  )}
                </div>
              );
            })}
          </div>
        </aside>
        <div
          className="resize-handle--x"
          onMouseDown={this.mousedown.bind(this)}
          data-target="aside"
        >
          {/* <div className="btn-toggle-resize">
            <button onClick={this.setToggle.bind(this)}>
              {this.state.toggle ? "<<<" : ">>>"}
            </button>
          </div> */}
        </div>
      </>
    );
  }
}

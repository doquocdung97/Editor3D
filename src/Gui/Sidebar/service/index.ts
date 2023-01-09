class _SidebarService {
  parent: any;
  tabs: any = {};
  // constructor() {

  // }
  _active = 0;
  Active() {
    let tabs = this.getTabs();
    if (Object.keys(tabs).length < this._active) {
      return 0;
    }
    return this._active;
  }
  setActive(val: number, update: boolean = true) {
    if(this._active == val) return;
    let tabs = this.getTabs();
    let length = Object.keys(tabs).length 
    if(length > val){
      this._active = val;
      if (update) this.update();
    }else{
      throw new Error("you can't active this tab!");
    }
    
  }
  update() {
    this.parent.setState({ date: new Date() });
  }
  init(parent: any) {
    this.parent = parent;
  }
  addTab(name: any, component: any) {
    var tab = this.tabs[name];
    if (tab) {
      throw new ErrorEvent("name already in tabs");
    }
    this.tabs[name] = new component(this);
  }
  getTabs() {
    return this.tabs;
  }
  getTab(name: any) {
    return this.tabs[name];
  }
  getTabActive() {
    let index = this.Active();
    let tabs = this.getTabs();
    if (index >= 0) {
      let str = Object.keys(tabs)[index];
      return tabs[str];
    }
  }
}
const SidebarService = new _SidebarService();
window["SidebarService"] = SidebarService;
export default SidebarService;

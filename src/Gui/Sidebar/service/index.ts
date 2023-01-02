class _SidebarService {
  parent: any;
  tabs: any = {};
  // constructor() {

  // }
  init(parent: any) {
    this.parent = parent;
  }
  // onResize() {
  //   // this.parent.onResize();
  // }
  // create(component: any) {
  //   this.parent.createTabs(component);
  // }
  apply(data: any) {
    this.parent.setState(data);
  }
  addTab(name: any, component: any) {
    var tab = this.tabs[name];
    if (tab) {
      throw new ErrorEvent("name already in tabs");
    }
    this.tabs[name] = component;
  }
}
const SidebarService = new _SidebarService();
export default SidebarService;

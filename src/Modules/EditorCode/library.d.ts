/**
   Sidebar
   */
class _SidebarService {
  parent: any;
  tabs: any = {};
  _active = 0;
  /**
   * Returns Active sidebar
   */
  Active(): number {}
  /**
   * set active sidebar
   * parameter
   * val = number 0,1,2....
   * update : boolean true(update view)
   */
  setActive(val: number, update: boolean = true) {}
  update() {}
  init(parent: any) {}
  apply(data: any) {}
  addTab(name: any, component: any) {}
  getTabs() {}
  getTabActive(): any;
}

var SidebarService = new _SidebarService();
class Vector {
  x: number;
  y: number;
  z: number;
  /**
   * @type {*} - can be 'any' type
   */
  constructor(x?: number, y?: number, z?: number);
  /**
   * Returns the next fact
   */
  get Length(): number;
  /***/
}

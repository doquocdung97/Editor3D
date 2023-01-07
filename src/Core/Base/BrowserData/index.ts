export default class BrowserData {
  get(key: string) {
    let data = localStorage.getItem(key);
    return data;
  }
  getAll() {
    return localStorage;
  }
  set(key: string, object: any) {
    //if(object int)
    localStorage.setItem(key, object);
  }
  clear(key: string) {
    localStorage.removeItem(key);
  }
  clearAll() {
    localStorage.clear();
  }
}

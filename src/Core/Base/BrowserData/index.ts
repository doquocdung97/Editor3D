export default class BrowserData {
  get(key: string): string {
    let data = localStorage.getItem(key);
    if (data)
      return data;
    return String()
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

export function findByType(element: any, type: any): any {
  if (!element) return;
  if (element.length > 1) {
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      if (e.type.name === type.name) {
        return e;
      }
    }
  } else {
    if (element.type.name === type.name) {
      return element;
    }
  }
}
export function findByTypes(element: any, type: any): any {
  if (!element) return;
  if (element.length > 1) {
    let elements:any[] = []
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      if (e.type.name === type.name) {
        elements.push(e)
      }
    }
    return elements
  }
}
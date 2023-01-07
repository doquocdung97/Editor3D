function parseBoolean(value: any) {
  if (value == "true" || value == 1) {
    return true;
  }
  return false;
}
export { parseBoolean };

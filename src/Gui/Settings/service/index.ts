class _SettingsService {
  private parent: any;
  init(component: any) {
    this.parent = component;
  }
}
const SettingsService = new _SettingsService();
window["SettingsService"] = SettingsService;
export default SettingsService;

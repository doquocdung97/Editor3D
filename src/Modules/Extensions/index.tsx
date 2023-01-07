import LayoutService from "../../Gui/Layout/service";
import SidebarService from "../../Gui/Sidebar/service";
import { WorkbenchBase, TabBase } from "../../Gui/Sidebar";
class TabChild extends TabBase {
  Title = "Skechers";
  render() {
    return (
      <>
        <TabBase.Base.Header title={this.Title}>
          <TabBase.Button>
            <TabBase.Icon iconName="ArrowClockwise" />
          </TabBase.Button>
        </TabBase.Base.Header>
        <TabBase.Base.Body>
          <h1>sdfdsf 3</h1>
        </TabBase.Base.Body>
      </>
    );
  }
}
class ExtensionsTab extends WorkbenchBase {
  Children = [TabChild];
  Title = "Extensions";
  Name = "Extensions";
  Icon = "Boxes";
  constructor() {
    super();
  }
  IsActive() {
    return true;
  }
  Activated() {}
}
SidebarService.addTab("Extensions", ExtensionsTab);

import SidebarService from "Gui/Sidebar/service";
import { WorkbenchBase, TabBase } from "Gui/Sidebar";
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
class DatabaseTab extends WorkbenchBase {
  Children = [TabChild];
  Title = "Data base";
  Name = "Database";
  Icon = "Database";
  constructor(parent:any) {
    super(parent);
  }
  IsActive() {
    return true;
  }
  Activated() {}
}
SidebarService.addTab("Database", DatabaseTab);

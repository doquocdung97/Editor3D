import SidebarService from "Gui/Sidebar/service";
import { WorkbenchBase, TabBase } from "Gui/Sidebar";
import { Button, Modal, Form } from 'react-bootstrap';
import TreeView from "./TreeView"
import Property from "./property";
import service from "./service";
import { Core } from "src/Core";
import { useEffect, useState } from "react";
import ServiceData from "./service";
import SelectSearch from 'react-select-search';
import  './style.scss'
class TabChild extends TabBase {
  Title = "Document";
  constructor(parent: any) {
    super(parent)
    const self = this
    service.addEventListener('update', () => {
      self.update()
    })
    service.addEventListener('load', () => {
      self.update()
    })
  }
  reload() {
    service.load()
  }
  onSelect(e: any) {
    if (e && e.length > 0) {
      const row = e[0]
      ServiceData.onSelection(row.data)
    }
  }
  render() {
    const doc = ServiceData.get()
    var data: any = []
    if (doc) {
      data = [doc]
    }
    return (
      <>
        <TabBase.Base.Header title={this.Title}>
          <TabBase.Button>
            <TabBase.Icon iconName="Search" />
          </TabBase.Button>
          <TabBase.Button onClick={this.reload.bind(this)}>
            <TabBase.Icon iconName="ArrowClockwise" />
          </TabBase.Button>
        </TabBase.Base.Header>
        <TabBase.Base.Body>
          <TreeView
            multiselection={true}
            data={data}
            onSelect={this.onSelect.bind(this)} />
        </TabBase.Base.Body>
      </>
    );
  }
}
const ModalCreaceProperty = (props: any) => {
  const { show, propertys, onClose, onSave } = props
  const [type, setType] = useState(String())
  const [name, setName] = useState(String())
  const [options, setOption] = useState<any[]>([])

  // const [typeMessage,setTypeMessage] = useState(String("Type has not been entered"))
  // const [nameMessage,setNameMessage] = useState(String("Name has not been entered"))


  const onHandleSave = async () => {
    const status = await onSave(type, name)
    if(status){
      setName(String())
    }
  }
  const onHide = () =>{
    onClose()
    setName(String())
  }
  useEffect(() => {
    if (propertys?.length) {
      setType(propertys[0])
      const vals:any[] = []
      for (let index = 0; index < propertys.length; index++) {
        const element = propertys[index];
        const val:any = {name: element, value: element}
        vals.push(val)
        
      }
      setOption(vals)
    }
  }, [propertys]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Insert Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Property</Form.Label>
        <SelectSearch options={options} search={true} placeholder="Choose your language" value={type} onChange={e => setType(e.toString())}/>

        {/* <Form.Select value={type} onChange={e => setType(e.target.value)}>
          {
            propertys?.map((item: any, index: number) => {
              return <option value={item} key={index}>{item}</option>
            })
          }
        </Form.Select> */}
        {/* <Form.Text className="text-danger">{typeMessage}</Form.Text> */}
        <br />
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
        {/* <Form.Text className="text-danger">{nameMessage}</Form.Text> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={onHandleSave} disabled={(name && type) ? false : true}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}
class PropertyChild extends TabBase {
  Title = "Property";
  private theme: string = String()
  private show = false
  private _config: any = {}
  private rowData = []
  constructor(parent: any) {
    super(parent)
    service.addEventListener('onSelection', this.onSelection.bind(this))
    const core = new Core()
    const self = this
    core.getConfig().then((data: any) => {
      self._config = data
      self.update()
    })
  }

  onSelection(result: any) {
    if( result.data){
      this.rowData = result.data
    }else{
      this.rowData = []
    }
    
    this.update()
  }

  handleShowModal() {
    this.show = true
    this.update()
  }

  handleCloseModal() {
    this.show = false
    this.update()
  }

  async createParameter(type, name) {
    const result = await ServiceData.createParameter(type, name)
    if (result.success) {
      this.show = false
      this.update()
      return true
    }
    return false
  }
  async updateProperty(row:any){
    const result = await ServiceData.updateProperty(row)
    if (result.success) {
      return true
    }
    return false
  }
  render() {
    const data:any = ServiceData.getSelection()
    return (
      <>
        <TabBase.Base.Header title={this.Title}>
          <TabBase.Button disabled={(data?.theme == "parameter" ? false : true)} onClick={this.handleShowModal.bind(this)}>
            <TabBase.Icon iconName="PlusLg" />
          </TabBase.Button>
          <TabBase.Button>
            <TabBase.Icon iconName="Gear" />
          </TabBase.Button>
        </TabBase.Base.Header>
        <TabBase.Base.Body>
          <Property
            onEndChangeRow={this.updateProperty}
            data={this.rowData}
          />
          <ModalCreaceProperty
            propertys={this._config?.property}
            show={this.show}
            onSave={this.createParameter.bind(this)}
            onClose={this.handleCloseModal.bind(this)} />
        </TabBase.Base.Body>
      </>
    );
  }
}

class DatabaseTab extends WorkbenchBase {
  Children = [TabChild, PropertyChild];
  Title = "Data base";
  Name = "Database";
  Icon = "Database";
  constructor(parent: any) {
    super(parent);
    service.load('testdemo').then(data => {
      this.update()
    })

  }
  IsActive() {
    return true;
  }
  Activated() { }
}
SidebarService.addTab("Database", DatabaseTab);

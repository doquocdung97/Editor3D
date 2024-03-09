import React from "react";
import { Icon } from "@components/Icon";
import { Modal, Button } from 'react-bootstrap';
export interface ResourcesModel {
  title: string,
  size?: 'sm' | 'lg' | 'xl',
  body: React.ReactNode
}

export class ComponetValueCell extends React.Component<{ getValue: any, row: any, column: any, table: any }, { showModal: boolean, value: any, newvalue: any, messageerror: string }>{
  getResourcesModel(): ResourcesModel | undefined {
    return
  }
  // componentWillReceiveProps(nextProps:any) {
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   // console.log(this.props.row.original,nextProps)
  //   const val = this.props.row.original.value
  //   this.setState({value:val,newvalue:val})
  // }
  // getSnapshotBeforeUpdate(prevProps:any) {
  //   return { notifyRequired: prevProps.text !== this.props.text };
  // }
  isEditRow = true
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (JSON.stringify(this.props.row.original.value) !== JSON.stringify(prevState.value)) {
      const val = prevProps.row.original.value
      this.setState({ value: val, newvalue: val })
    }
    this.props.row.convert = this.convert.bind(this)
  }
  constructor(props: any) {
    super(props)
    this.state = {
      showModal: false,
      value: this.props.getValue(),
      newvalue: this.props.getValue(),
      messageerror: String()
    }
  }
  get name(): string {
    return this.props.row.original.name
  }
  get value() {
    return this.state.value
  }
  onChange(val: any) {
    this.setState({ value: val, newvalue: val })
    this.props.row.original.value = val
    const tableMeta = this.props.table.options.meta;
    tableMeta.onChangeRow(this.props.row)
    const resources = this.getResourcesModel()
    if (resources) {
      this.setState({ showModal: false })
    }
    tableMeta?.setEditedRows((old: []) => ({
      // ...old,
      [this.props.row.id]: 2,
    }));
  }
  onChangeModal(val: any) {
    this.setState({ newvalue: val })
  }
  closeEditer() {
    const tableMeta = this.props.table.options.meta;
    tableMeta?.setEditedRows((old: []) => ({
      // ...old,
      [this.props.row.id]: 0,
    }));
  }
  convert(row){
    if (row?.original){
      row.original_value = row.original.value
    }
    return row
  }
  setEditedRows() {
    // const elName = e.currentTarget.name;
    // for(let key in tableMeta.editedRows){
    //   tableMeta?.revertData(key, true);
    // }
    if(this.isEditRow){
      const tableMeta = this.props.table.options.meta;
      if(tableMeta){
        const ids = Object.keys(tableMeta.editedRows)
        for (let index = 0; index < ids.length; index++) {
          const id = ids[index];
          let row:any = null
          if(tableMeta.editedRows[id] == 2){
            row = this.props.table.getRow(id)
          }
          if(row?.convert){
            tableMeta.onEndChangeRow(row.convert(row))
          }
        }
        
      }
      tableMeta?.setEditedRows((old: []) => ({
        // ...old,
        [this.props.row.id]: 1,
      }));
    }
  };
  setShowModal(status: boolean) {
    this.setState({ showModal: status, messageerror: String() })
  }
  private closeModal() {
    this.setShowModal(false)
    this.setState({ newvalue: this.state.value })
  }
  onCheckChange() {
    if ((typeof this.state.newvalue == "string" && this.state.newvalue != JSON.stringify(this.state.value)) ||
      JSON.stringify(this.state.newvalue) != JSON.stringify(this.state.value)
    ) {
      this.onChange(this.state.newvalue)
    } else {
      this.setState({ messageerror: "Value is not change" })
    }
  }
  modal(resources: ResourcesModel): React.ReactNode {
    return (
      <>
        <div className="group-cell">
          {this.view()}
          <div className="btn-tool">
            <button onClick={() => this.setShowModal(true)}><Icon iconName="Pencil"></Icon></button>
          </div>
        </div>
        <Modal className="property-modal" show={this.state.showModal} size={resources.size} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>{resources?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {resources?.body}
            <label className="txt-error">{this.state.messageerror}</label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.closeModal()}>Close</Button>
            <Button variant="primary" onClick={this.onCheckChange.bind(this)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
  editer(): React.ReactNode {
    const resources = this.getResourcesModel()
    if (resources) {
      return this.modal(resources)
    }
    return
  }
  view(): React.ReactNode {
    return (<p>{this.value}</p>);
  }
  render(): React.ReactNode {
    const tableMeta = this.props.table.options.meta
    const editer =  this.editer()
    if (tableMeta?.editedRows[this.props.row.id] && editer) {
      return (
        <div className="cell-edit-value">
          {editer}
          {/* <div className="group-cell">
            <div className="btn-tool">
              <button><Icon iconName="Pencil"></Icon></button>
            </div>
          </div> */}
          
        </div>
      )
      
    }
    return <div className="cell-value" onClick={this.setEditedRows.bind(this)}>{this.view()}</div>
  }
}
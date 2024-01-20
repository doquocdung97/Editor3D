import { ReactNode, useEffect, useState } from "react";
import { ComponetValueCell, ResourcesModel } from "./common";
import { Icon } from "@components/Icon";
import ListInput from "@components/ListInput";
import Input from "@components/Input";
import { PropertyModel } from "../utils";

class VectortCell extends ComponetValueCell {
  // constructor(props:any){
  //   super(props)
  //   if (item.type == "PropertyVector") {
  //     const x: PropertyModel = {
  //       status: 0,
  //       "name": "X",
  //       "value": item.value.x,
  //       type: "PropertyFloat",
  //       subRows: []
  //     }
  //     const y: PropertyModel = {
  //       status: 0,
  //       "name": "Y",
  //       "value": item.value.y,
  //       type: "PropertyFloat",
  //       subRows: []
  //     }
  //     const z: PropertyModel = {
  //       status: 0,
  //       "name": "Z",
  //       "value": item.value.z,
  //       type: "PropertyFloat",
  //       subRows: []
  //     }
  //     item.subRows = [x, y, z]
  //   }
  //   this.state = {
  //     showModal: false,
  //     value: this.props.getValue(),
  //     newvalue: this.props.getValue()
  //   }
  // }
  view(): ReactNode {
    if (this.value) {
      return <p>{`Vector(${this.value.x},${this.value.y},${this.value.z})`}</p>
    }
  }
  // onChange(val: any): void {
  //   super.onChange(val)
  //   // this.props.row.original.Sub
  //   const subrow = this.props.row.originalSubRows
  //   if(subrow?.length){
  //     const x = subrow.find((n:any)=>n.name == "X")
  //     if(x){
  //       x.value = val.x
  //     }
  //     const y = subrow.find((n:any)=>n.name == "Y")
  //     if(y){
  //       y.value = val.y
  //     }
  //     const z = subrow.find((n:any)=>n.name == "Z")
  //     if(z){
  //       z.value = val.z
  //     }
  //   }
  // }
  getResourcesModel(): ResourcesModel | undefined {
    return {
      title: `Edit ${this.name}`,
      size:"sm",
      body: <Input type="vector" value={this.value}  onChange={e=>{this.onChangeModal(e.target.value)}}></Input>
    }
  }
}
class VectortsCell extends ComponetValueCell {
  view(): ReactNode {
    let value = this.value?.map((vector: any, index: number) => {
      return `Vector(${vector.x},${vector.y},${vector.z})`
    })
    return <p title={value.join(', ')}>{value.join(', ')}</p>
  }

  getResourcesModel(): ResourcesModel | undefined {
    return {
      title: `Edit ${this.name}`,
      body: <ListInput data={this.value} type="vector" onChange={this.onChangeModal.bind(this)}></ListInput>
    }
  }
}
export default {
  "PropertyVector": VectortCell,
  "PropertyVectors": VectortsCell,
}
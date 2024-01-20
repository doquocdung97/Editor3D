import { ReactNode, useEffect, useState } from "react";
import { ComponetValueCell } from "./common";
class EnumCell extends ComponetValueCell{
  editer(): ReactNode {
    const attribute = this.props.row.original.attribute
    const values = attribute.values
    if(values && values.length > 0){
      return (
        <select onChange={e=>{this.onChange(e.target.value)}} value={this.value} >
          {
            values?.map((name:string,index:number)=>{
              return <option key={index} value={name}>{name}</option>
            })
          }
        </select>
      )
    }
    return (<></>)
    
  }
}
export default {
  "PropertyStringEnum": EnumCell,
  "PropertyIntegerEnum": EnumCell,
  "PropertyFloatEnum": EnumCell,
}
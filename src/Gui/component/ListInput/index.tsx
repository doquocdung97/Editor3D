import { useEffect, useState } from "react"
import {Button} from "../Button"
import { Icon } from "../Icon"
import Input from "../Input"
import "./style.scss"
import { arraysEqual } from "@core/Base/utils"
import { List, arrayMove, arrayRemove } from 'react-movable';
interface ListInputProps {
  type?: "string" | "number" | "float" | "vector",
  data: any[]
  onChange?: (e: any[]) => void
}
const ListInput = (props: ListInputProps) => {
  const [inputOld, setInputOld] = useState(props.data)
  const [inputs, setInputs] = useState(props.data)
  useEffect(() => {
    if (!arraysEqual(inputs, inputOld)) {
      var vals = convertDataByType(inputs)
      setInputOld(vals)
      if (props.onChange) {
        props.onChange(vals)
      }

    }
  }, [inputs]);

  const convertDataByType = (data: any[]) => {
    let vals:number[] = []
    for (let index = 0; index < data.length; index++) {
      const val = data[index];
      if (val == String()) {
        continue
      }
      if (props.type == "number") {
        if (val && val != String(0))
          vals.push(parseInt(val))
      }

      else if (props.type == "float") {
        if (val && val != String(0))
          vals.push(parseFloat(val))
      }
      else
        vals.push(val)
    }
    return vals
  }
  const addInputs = () => {
    let datas = Object.assign([], inputs)

    if (props.type == "vector") {
      datas.push({ x: 0, y: 0, z: 0 })
    } else {
      datas.push(String())
    }
    setInputs(datas)
  }

  const removeInputs = (index: number) => {
    let datas = Object.assign([], inputs)
    datas.splice(index, 1);
    setInputs(datas)
  }
  const onChangeInputs = (event: any, index: number) => {
    let datas: any[] = Object.assign([], inputs)
    datas[index] = event.target.value
    setInputs(datas)
  }
  const mainprops = props
  return (
    <>
      <div className="list-input">
        {/* <div className="list"> */}
        {
          // inputs.map((val, index) => {
          //   return (
          //     <div key={index} className="group">
          //       {/* <label>Index({index})</label> */}
          //       <Input type={props.type} value={val} onChange={(e) => onChangeInputs(e, index)} />
          //       {/* <p>x: {val.x}, y: {val.y}, z: {val.z}</p> */}
          //       <Button mode="icon" onClick={() => removeInputs(index)} ><Icon iconName="XLg"></Icon></Button>
          //     </div>
          //   )
          // })
          <List
            lockVertically
            values={inputs}
            onChange={({ oldIndex, newIndex }) =>
              setInputs(arrayMove(inputs, oldIndex, newIndex))
            }
            renderList={({ children, props }) => <div className="list" {...props}>{children}</div>}
            renderItem={({ value, props,index }) =>
              <div className="group-input"
              {...props}
              style={{
                ...props.style,
                margin: '10px 0'
              }}
              >
                <Button mode="icon"
                  data-movable-handle
                  tabIndex={-1}
                >
                  <Icon iconName="ArrowsMove"></Icon>
                </Button>
                <Input type={mainprops.type} value={value} onChange={(e) =>
                  onChangeInputs(e, (props.key ? props.key : 0))
                } />
                <Button mode="icon" onClick={() => 
                setInputs(
                  typeof index !== 'undefined'
                    ? arrayRemove(inputs, index)
                    : inputs
                )
                // removeInputs((props.key ? props.key : 0))
                } ><Icon iconName="XLg"></Icon></Button>
              </div>
            }
          />
        }
        {/* </div> */}
        <div className="tool">
          <Button mode="full" onClick={addInputs}><Icon iconName="Plus"></Icon></Button>
        </div>
      </div>
    </>
  )
}
export default ListInput
// move item
// https://github.com/tajo/react-movable
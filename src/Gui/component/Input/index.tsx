import React, { useEffect, useRef, useState } from "react";
import "./style.scss"
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  mode?: 'base';
}
interface Vector {
  x: number,
  y: number,
  z: number
}
interface InputVectorProps {
  value?: Vector;
  onChange?: (e: any) => void
}
const InputVector = (props: InputVectorProps) => {
  const [valX, setValX] = useState(props.value ? props.value.x : 0)
  const [valY, setValY] = useState(props.value ? props.value.y : 0)
  const [valZ, setValZ] = useState(props.value ? props.value.z : 0)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [vector, setVector] = useState({
    x: valX,
    y: valY,
    z: valZ,
  })
  useEffect(() => {
    setValX(props.value ? props.value.x : 0)
    setValY(props.value ? props.value.y : 0)
    setValZ(props.value ? props.value.z : 0)
  }, [props.value]);
  useEffect(() => {
    if (valX != vector.x || valY != vector.y || valZ != vector.z) {
      const val = { x: valX, y: valY, z: valZ, }
      setVector(val)
      if (props.onChange) {
        props.onChange({
          target: {
            value: { x: valX, y: valY, z: valZ }
          }
        })
      }
    }
  }, [valX, valY, valZ]);
  return (
    <div className="input-vector" ref={inputRef}>
      <div className="group">
        <label>X:</label>
        <input className="input-base" type="number" value={valX} onChange={(e) => setValX(parseFloat(e.target.value))} ></input>
      </div>
      <div className="group">
        <label>Y:</label>
        <input className="input-base" type="number" value={valY} onChange={(e) => setValY(parseFloat(e.target.value))}></input>
      </div>
      <div className="group">
        <label>Z:</label>
        <input className="input-base" type="number" value={valZ} onChange={(e) => setValZ(parseFloat(e.target.value))}></input>
      </div>
    </div>
  )
}
const Input = (props: InputProps) => {
  var type = props.type
  if (type == "float") {
    type = "number"
  }
  else if (type == "vector") {
    const value: any = props.value
    return (<InputVector value={value} onChange={props.onChange}></InputVector>)
  }
  return (
    <input className="input-base" {...props}></input>
  )
}
export default Input
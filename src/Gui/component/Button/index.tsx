import { Button as BootstrapButton, ButtonProps as BootstrapButtonProps } from "react-bootstrap"
import "./style.scss"
const ButtonIcon = (props: any) => {
  return <button className="btn-icon" {...props}></button>
}
interface ButtonProps extends BootstrapButtonProps {
  mode: any
}
const Button = (props: ButtonProps) => {
  const { mode } = props
  const modes: any = {
    bootstrap: BootstrapButton,
    icon: () => {
      return <button className="btn-icon" {...props}></button>
    },
    full: () => {
      return <button className="btn-full" {...props}></button>
    }
  }
  var ButtonComponent = modes[mode]
  if (!ButtonComponent) {
    return (
      <button {...props}></button>
    )
  }
  return <ButtonComponent {...props}></ButtonComponent>
}
export  {Button,ButtonIcon}
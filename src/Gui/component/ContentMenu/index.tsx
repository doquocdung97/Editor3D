import React from "react";
import './style.scss'
import { findByTypes } from "src/Gui/common";
//define a functional component for the right-click context menu 
export function ContextMenu(props:any) {
  const {children,show, onShow, onHide} = props 
  //state variables
  const [xyPosition, setxyPosition] = React.useState({ x: 0, y: 0 });

  //event handler for showing the context menu
  const showNav = (event) => {
    event.preventDefault();
    onHide(event)
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setxyPosition(positionChange);
    onShow(event)
  };

  //event handler for hiding the context menu
  const hideContext = (event) => {
    onHide(event)
  };

  //function to set the chosen menu option
  const [chosen, setChosen] = React.useState();
  const initMenu = (chosen) => {
    setChosen(chosen);
  };

  var items = findByTypes(children, ContextMenuItem);
  return (
    <>
      <div
        className="contextContainer"
        onContextMenu={showNav}
        onClick={hideContext}
      >
        {children}
        {chosen && <h4>"{chosen}" is chosen</h4>}
        {show && (
          <div
            style={{ top: xyPosition.y, left: xyPosition.x }}
            className="rightClick"
          >
            {items}
          </div>
        )}
      </div>
    </>
  );
}
export function ContextMenuItem(props:any) {
  const {onClick} = props
  return (
    <div className="menuElement" onClick={onClick}>{props.children}</div>
  )
}
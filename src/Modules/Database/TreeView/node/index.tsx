import { useEffect, useState } from "react";
import { NodeRendererProps, Tree } from "react-arborist";
import { Icon } from "@components/Icon"
import { IconModel, ObjectBase, TypeIcon } from "../../service/interface";
import { Command, _Command } from "src/Core/command";
import { ContextMenuTrigger, ContextMenu, ContextMenuItem, Submenu } from 'rctx-contextmenu';
import ServiceData from "../../service";
const command = new _Command()
function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
  /* This node instance can do many things. See the API reference. */
  const [commands, setCommands] = useState<any[]>([])
  const fetch = async () => {
    let data = await ServiceData.get_command_by_object(node.data.type)
    setCommands(data)
  }
  useEffect(() => {
    fetch()
  }, [node])

  const extend = (node: any) => {
    if (node.children.length == 0) {
      return (<div className="w-16"></div>)
    }
    if (node.isOpen) {
      return (<Icon iconName="CaretUpFill"></Icon>)
    }
    return (<Icon iconName="CaretDownFill"></Icon>)
  }
  const length = node.children ? node.children.length : 0
  const iconvalue = (icon: IconModel) => {
    if (!icon) {
      return
    } else if (icon.type == TypeIcon.BOOTSTRAP) {
      return (<Icon iconName={icon.value}></Icon>)
    }
  }
  const onInsert = (data: ObjectBase, parent: ObjectBase,) => {
    ServiceData.insert(data, parent)
  }
  const menuItem = (n: Command) => {
    if (n.children?.length > 0) {
      return (
        <Submenu title={n.title}>
          {
            n.children?.map(n => {
              return menuItem(n)
            })
          }
        </Submenu>
      )
    }
    return (<ContextMenuItem onClick={async () => {
      let params: any[] = []
      for (let index = 0; index < n.args.length; index++) {
        const arg = n.args[index];
        let type = 'document'
        let name = ServiceData.getName()
        if (arg != 'Document') {
          name = node.data.name
          type = 'object'
        }
        params.push({
          "type": type,
          "name": name
        })

      }
      const variables = {
        "name": n?.name,
        "document": ServiceData.getName(),
        "parameters": params
      }
      const result = await command.run(variables)
      if (result.success) {
        Object.assign(node.data, result.data)
        ServiceData.update()
      }
    }}>{n?.title}</ContextMenuItem>)
  }
  const getMenuItemByTyle = (type:string) =>{
    if(type == "ObjectCar")
      return (<><ContextMenuItem>Create view</ContextMenuItem></>)
    return (<></>)
  }
  return (
    <>
      <ContextMenuTrigger className="item-box" id={node.id}>
        <div style={style} ref={dragHandle} className={`${node.isSelected ? "active" : ""} item`} onClick={(e) => { if (e.detail == 2) node.toggle() }}>
          {!node.isLeaf && (<div className="item-extend" onClick={() => node.toggle()}>{extend(node)}</div>)}
          {iconvalue(node.data.icon)}
          {node.data.name} {length > 0 && `(${length})`}
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={node.id}>
        {getMenuItemByTyle(node.data.type)}
        {
          (commands?.length) ? (
            commands?.map(n => {
              return menuItem(n)
            })
          ) : (<></>)
        }
      </ContextMenu>
    </>

  );
}
export default Node
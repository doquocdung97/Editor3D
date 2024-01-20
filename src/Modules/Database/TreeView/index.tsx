import { Tree } from "react-arborist";
import { Icon } from "@components/Icon"
import "./style.scss"
import { useEffect, useRef, useState } from "react";
import { Button } from "@components/Button";
import {  ObjectBase } from "../service/interface";
import Node from './node'
import { GraphqlHelper } from "src/Core/Base/graphql";
import { QUERY_DOCUMENT } from "../graphql/document";
const graphql = new GraphqlHelper()
const TreeView = (props: any) => {
  const {data, onSelect, multiselection} = props
  
  const [search, setSearch] = useState(String())
  const onToggle = (id: any) => {
    const tree: any = treeRef.current;
    const node = tree.get(id)
    // console.log(id, node)
  };
  const onSelectData = async (e: any) => {
    if(onSelect){
      onSelect(e)
    }
  }
  

  const treeRef = useRef();
  useEffect(() => {
    const tree: any = treeRef.current;
    // tree.visibleNodes.map(i=>i.isOpen)
    // window["tree"] = tree
    if (tree) {
      tree.visibleNodes.map((item: any) => {
        if (item.data.isOpen) {
          item.open()
        }
      })
    }
    // graphql.subscription(QUERY_DOCUMENT.SUBSCRIPTION,{  
    //   "name": "testdemo",
    // }).subscribe({
    //   next({ data }:any) {
    //     if (data){
    //       console.log(data)
    //     }
    //   },
    // });
  }, [data]);
  return (
    <div className="tree-view">
      <div className="search">
        <div className="group">
          <input onChange={(e) => { setSearch(e.target.value) }} value={search}></input>
          {(search.length > 0) && <div className="btn-group">
            <Button mode="icon"><Icon iconName="XLg" size={15} onClick={() => setSearch(String())}></Icon></Button>
          </div>}
        </div>
      </div>
      <Tree
        className="list"
        ref={treeRef}
        data={data}
        openByDefault={false}
        searchTerm={search}
        searchMatch={
          (node, term) => node.data.name.toLowerCase().includes(search.toLowerCase())
        }
        width="100%"
        disableMultiSelection={multiselection}
        height={200}
        // indent={24}
        rowHeight={40}
        // paddingTop={30}
        // paddingBottom={10}
        // padding={25}
        onToggle={onToggle}
        disableDrag={true}
        idAccessor={(n: ObjectBase) => n.uuid}
        onSelect={onSelectData}
      >
        {Node}
      </Tree>
    </div>
  )
}
export default TreeView
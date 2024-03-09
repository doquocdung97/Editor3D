import { createRef, useState, Component, useRef, useEffect } from "react";

import { ViewBase } from "Gui/Layout/View/index";
import LayoutService from "Gui/Layout/service";
import "./style.scss"
import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';
import DocumentNode from './node/index'
// import 'reactflow/dist/style.css';
import './style.scss';
import service from "../Database/service";
const nodeTypes = {
  custom: CustomNode,
  Document:DocumentNode
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge:any) => {
    if (edge.sourceHandle) {
      const data = nodes.find((node) => node.type === 'custom')
      if(data){
        const edgeType = data.data.selects[edge.sourceHandle];
        edge.type = edgeType;
      }
    }

    return edge;
  });
  const create_node = (data,type,position)=>{
    return {
      id: data.uuid,
      type: type,
      data: {
        name: data.name,
        label: data.label,
        version: data.version,
        propertys: data.propertys
      },
      position: position,
    }
  }
  const feat_data = async ()=>{
    const data = await service.getAll()
    var x = 0
    var y = 0
    if(data){
      var rowdata:any = []
      rowdata.push(create_node(data,data.type,{ x,y}))
      const objects = data.objects
      if(objects){
        y+= 100
        for (let index = 0; index < objects.length; index++) {
          const element = objects[index];
          x+= 200
          rowdata.push(create_node(element,'custom',{x,y}))
        }
      }
      console.log(rowdata)
      setNodes(rowdata)
    }
  }
  useEffect(() => {
    feat_data()
  }, []);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};



export class ViewFlow extends ViewBase {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="viewflow">
        <OverviewFlow/>
        {/* <FlowRenderer /> */}
      </div>
    );
  }
}
LayoutService.addLayout("ViewFlow", ViewFlow);

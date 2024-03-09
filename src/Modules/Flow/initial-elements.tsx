import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes:any = [
  {
    id: '1',
    type: 'document',
    data: {
      name: "testdemo",
      label: null,
      version: "0.0.1",
      type: "Document",
      selects: {},
      propertys:  [
        {
          "name": "Label",
          "status": "FULL",
          "type": "PropertyString",
          "value": "test demo",
          "description": "",
          "attribute": {}
        },
        {
          "name": "AutoOpen",
          "status": "FULL",
          "type": "PropertyBool",
          "value": true,
          "description": "",
          "attribute": {}
        },
        {
          "name": "FileName",
          "status": "ONLYVIEW",
          "type": "PropertyString",
          "value": "d:\\Github\\garden\\garden-core\\backup\\test1.zip",
          "description": "",
          "attribute": {}
        }
      ]
    },
    position: { x: 250, y: 0 },
  },
  // {
  //   id: '2',
  //   data: {
  //     label: 'Default Node',
  //   },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   type: 'output',
  //   data: {
  //     label: 'Output Node',
  //   },
  //   position: { x: 400, y: 100 },
  // },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
        'handle-2': 'smoothstep',
      },
      propertys:  [
        {
          "name": "Label",
          "status": "FULL",
          "type": "PropertyString",
          "value": "test demo",
          "description": "",
          "attribute": {}
        },
        {
          "name": "AutoOpen",
          "status": "FULL",
          "type": "PropertyBool",
          "value": true,
          "description": "",
          "attribute": {}
        },
        {
          "name": "FileName",
          "status": "ONLYVIEW",
          "type": "PropertyString",
          "value": "d:\\Github\\garden\\garden-core\\backup\\test1.zip",
          "description": "",
          "attribute": {}
        }
      ]
    },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: 'custom style',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node',
    },
    position: { x: 400, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node 1',
    },
    position: { x: 400, y: 425 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  // {
  //   id: '8',
  //   type: 'default',
  //   className: 'annotation',
  //   data: {
  //     label: (
  //       <>
  //         On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
  //         <strong>MiniMap</strong>. This is also just a node 🥳
  //       </>
  //     ),
  //   },
  //   draggable: false,
  //   selectable: false,
  //   position: { x: 150, y: 400 },
  // },
];

export const edges = [
  // { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  // { id: 'e1-3', source: '1', target: '3', animated: true },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  //   type: 'smoothstep',
  //   sourceHandle: 'handle-0',
  //   data: {
  //     selectIndex: 0,
  //   },
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
  // {
  //   id: 'e4-6',
  //   source: '4',
  //   target: '6',
  //   type: 'smoothstep',
  //   sourceHandle: 'handle-1',
  //   data: {
  //     selectIndex: 1,
  //   },
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
  // {
  //   id: 'e4-7',
  //   source: '4',
  //   target: '7',
  //   type: 'smoothstep',
  //   sourceHandle: 'handle-2',
  //   data: {
  //     selectIndex: 1,
  //   },
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
];

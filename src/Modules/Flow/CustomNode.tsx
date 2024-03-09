import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';

const options = [
  {
    value: 'smoothstep',
    label: 'Smoothstep',
  },
  {
    value: 'step',
    label: 'Step',
  },
  {
    value: 'default',
    label: 'Bezier (default)',
  },
  {
    value: 'straight',
    label: 'Straight',
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function CustomNode({ id, data }) {
  return (
    <>
    <Handle type="source" position={Position.Top} id={id} />
      <div className="custom-node__header">
        This is a <strong>{data.name}</strong>
      </div>
      <div className="custom-node__body">
        {/* {Object.keys(data.selects).map((handleId) => (
          <Select key={handleId} nodeId={id} value={data.selects[handleId]} handleId={handleId} />
        ))}
        <div className="custom-node__select">
          <div>Objects</div>
          <Handle type="source" className='obj' position={Position.Right} id="objects" />
        </div>
        <div className="custom-node__select">
          <div>Medias</div>
          <Handle type="source" className='obj' position={Position.Right} id="media" />
        </div> */}

        <strong>Propertys</strong>
        {data.propertys.map((data) => (
        <div className="custom-node__select">
          <div>{data.name}</div>
          <input value={data.value}></input>
          {/* <Handle type="source" position={Position.Right} id={data.name} /> */}
        </div>
        ))}
      </div>
      
    </>
  );
}

export default memo(CustomNode);

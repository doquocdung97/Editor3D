import React, { memo } from 'react';
import { Handle, useReactFlow, useStoreApi, Position } from 'reactflow';

function DocumentNode({ id, data }) {
  return (
    <>
    <Handle type="source" position={Position.Top} id={id} />
      <div className="custom-node__header">
        This is a <strong>{data.name}</strong>
      </div>
      <div className="custom-node__body">
        <div className="custom-node__select">
          <div>Objects</div>
          <Handle type="source" className='obj' position={Position.Right} id="objects" />
        </div>
        <div className="custom-node__select">
          <div>Medias</div>
          <Handle type="source" className='obj' position={Position.Right} id="media" />
        </div>

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

export default memo(DocumentNode);

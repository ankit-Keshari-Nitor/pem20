import React from 'react';
import './blocks-tray.scss';
import { CATEGORY_TYPES, NODE_TYPES } from '../../constants';

export const BlocksTray = ({ category = CATEGORY_TYPES.TASK, readOnly }) => {
  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/nodeData', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="task-tray-aside">
      {NODE_TYPES.filter((x) => x.category === category).map((node) => {
        return (
          <div key={node.id} className="block-tray" onDragStart={(event) => onDragStart(event, node)} draggable={!readOnly}>
            <button className={`block-tray-field ${node.type}`}>
              <span className="block-tray-field-icon">{node.nodeIcon}</span>
              <span className="block-tray-field-text"> {node.type}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

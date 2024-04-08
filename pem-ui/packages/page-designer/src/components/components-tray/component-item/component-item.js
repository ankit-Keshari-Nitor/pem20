import React from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuid } from 'uuid';

import './component-item.scss';

const ComponentItem = ({ data }) => {
  const { type, label, icon } = data.component;
  
  const [{ opacity }, drag] = useDrag({
    item: { id: uuid(), type: data.type, component: data.component },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });

  return (
    <div ref={drag} style={{ opacity }}>
      <button className="palette-field" data-field-type={type} title={`Create ${getIndefiniteArticle(type)} ${label} element`}>
        {icon}
        <span className="palette-field-text">{label}</span>
      </button>
    </div>
  );
};
export default ComponentItem;

// helpers ///////////
function getIndefiniteArticle(type) {
  if (['image'].includes(type)) {
    return 'an';
  }

  return 'a';
}
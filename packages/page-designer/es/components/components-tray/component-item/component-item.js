/**
   PRIVATE LICENSE
   */
  
import React from 'react';
import './component-item.scss.js';
import { useDrag } from 'react-dnd';

const ComponentItem = props => {
  const {
    type,
    label,
    icon
  } = props;
  const [{
    isDragging
  }, drag] = useDrag({
    type: 'form-field',
    item: {
      id: type + '-' + Date.now().toString(36),
      type,
      labelText: label
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: drag,
    style: {
      border: isDragging ? '1px solid red' : '1px solid green'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "palette-field",
    "data-field-type": type,
    title: `Create ${getIndefiniteArticle(type)} ${label} element`
  }, icon, /*#__PURE__*/React.createElement("span", {
    className: "palette-field-text"
  }, label)));
};

// helpers ///////////
function getIndefiniteArticle(type) {
  if (['image'].includes(type)) {
    return 'an';
  }
  return 'a';
}

export { ComponentItem as default };

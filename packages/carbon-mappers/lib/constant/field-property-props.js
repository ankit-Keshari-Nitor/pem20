/**
   PRIVATE LICENSE
   */
  
'use strict';

const editableProps = {
  Basic: [{
    propsName: 'labelText',
    label: 'Label',
    value: 'Text Input'
  }],
  Condition: [{
    propsName: 'disabled',
    label: 'Disabled',
    value: false
  }, {
    propsName: 'isRequired',
    label: 'IsRequired',
    value: false
  }]
};
const helperText = {
  propsName: 'helperText',
  label: 'Helper Text',
  value: ''
};
const readOnly = {
  propsName: 'readOnly',
  label: 'ReadOnly',
  value: false
};
const minProps = {
  propsName: 'min',
  label: 'Min Value',
  value: ''
};
const maxProps = {
  propsName: 'max',
  label: 'Max Value',
  value: ''
};

exports.editableProps = editableProps;
exports.helperText = helperText;
exports.maxProps = maxProps;
exports.minProps = minProps;
exports.readOnly = readOnly;

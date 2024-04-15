import React from 'react';
import { FORM_FIELD_GROUPS, FORM_FIELD_LABEL, FORM_FIELD_TYPE, editableProps } from '../constant';
import { TextIcon } from './../icons';

const type = FORM_FIELD_TYPE.TEXT;

const Text = ({ field, id }) => {
  const { labelText } = field;

  return (
    <p data-testid={id} id={id}>
      {labelText}
    </p>
  );
};

export default Text;

// Config of Text for Left Palette & Right Palette
Text.config = {
  type,
  label: FORM_FIELD_LABEL.TEXT,
  group: FORM_FIELD_GROUPS.ACTION,
  icon: <TextIcon />,
  editableProps: {
    Basic: [...editableProps.Basic],
    Condition: []
  },
  advanceProps: []
};

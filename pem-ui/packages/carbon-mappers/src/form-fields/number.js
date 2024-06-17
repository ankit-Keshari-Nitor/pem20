// import React from 'react';
// import { NumberInput as CarbonNumberInput } from '@carbon/react';
// import { FORM_FIELD_TYPE, minProps, maxProps, readOnly, helperText, FORM_FIELD_LABEL, FORM_FIELD_GROUPS, labelText, isDisabled } from '../constant';
// import { CharacterWholeNumber } from '@carbon/icons-react';

// const type = FORM_FIELD_TYPE.NUMBER;

// const NumberInput = ({ field, id }) => {
//   const { type, labelText, isRequired, ...rest } = field;

//   return (
//     <>
//       <CarbonNumberInput data-testid={id} id={id} type={type} label={labelText} {...rest} />
//     </>
//   );
// };

// export default NumberInput;

// // Config of Accordion for Left Palette & Right Palette
// NumberInput.config = {
//   type,
//   label: FORM_FIELD_LABEL.NUMBER,
//   group: FORM_FIELD_GROUPS.BASIC_INPUT,
//   icon: <CharacterWholeNumber />,
//   editableProps: {
//     Basic: [labelText, helperText, isDisabled, readOnly],
//     Condition: []
//   },
//   advanceProps: [minProps, maxProps]
// };

import React, { useEffect, useState } from 'react';
import { NumberInput as CarbonNumberInput } from '@carbon/react';
import { FORM_FIELD_TYPE, minProps, maxProps, readOnly, helperText, FORM_FIELD_LABEL, FORM_FIELD_GROUPS, isRequired, labelText, isDisabled } from '../constant';
import { CharacterWholeNumber } from '@carbon/icons-react';

const type = FORM_FIELD_TYPE.NUMBER;

const NumberInput = ({ field, id, currentPath, onChangeHandle, previewMode }) => {
  const { labelText, helperText, disabled, value, isRequired, min, max, ...rest } = field;
  const [fieldValue, setFieldValue] = useState();

  useEffect(() => {
    if (previewMode) {
      setFieldValue(value ? value : '');
    }
  }, [field, previewMode, value]);

  return (
    <>
      <CarbonNumberInput
        type={FORM_FIELD_TYPE.TEXT}
        data-testid={id}
        id={id}
        label={labelText}
        helperText={helperText}
        disabled={disabled}
        defaultValue={1}
        value={fieldValue}
        onChange={(e) => {
          previewMode && onChangeHandle(currentPath, e.target.value);
          setFieldValue(e.target.value);
        }}
        {...rest}
      />
    </>
  );
};

export default NumberInput;

// Config of NumberInput for Left Palette & Right Palette
NumberInput.config = {
  type,
  label: FORM_FIELD_LABEL.NUMBER,
  group: FORM_FIELD_GROUPS.BASIC_INPUT,
  icon: <CharacterWholeNumber />,
  editableProps: {
    Basic: [labelText, helperText, isDisabled, readOnly],
    Condition: []
  },
  advanceProps: [minProps, maxProps, isRequired]
};

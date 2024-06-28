export const labelText = {
  propsName: 'labelText',
  label: 'Label',
  value: 'Label Text',
  type: 'TextInput'
};

export const isDisabled = {
  propsName: 'disabled',
  label: 'Disabled',
  value: false,
  type: 'Toggle'
};

export const isRequired = {
  propsName: 'isRequired',
  label: 'IsRequired',
  value: {
    value: false,
    message: ''
  },
  type: 'Toggle'
};

export const helperText = {
  propsName: 'helperText',
  label: 'Helper Text',
  value: '',
  type: 'TextInput'
};

export const hrefText = {
  propsName: 'hrefText',
  label: 'Href',
  value: '',
  type: 'TextInput'
};

export const readOnly = {
  propsName: 'readOnly',
  label: 'ReadOnly',
  value: false,
  type: 'Toggle'
};

export const minProps = {
  propsName: 'min',
  label: 'Min Value',
  value: {
    value: '',
    message: ''
  },
  type: 'TextInput'
};

export const maxProps = {
  propsName: 'max',
  label: 'Max Value',
  value: {
    value: '',
    message: ''
  },
  type: 'TextInput'
};
export const NameLabel = {
  propsName: 'name',
  label: 'Name',
  value: '',
  type: 'TextInput',
  invalid: false,
  invalidText: 'Name should be unique'
};

export const placeHolder = {
  propsName: 'placeHolder',
  label: 'Placeholder Text',
  value: '',
  type: 'TextInput'
};

export const valueLabel = {
  propsName: 'value',
  label: 'Value',
  value: '',
  type: 'TextInput'
};

export const regexValidation = {
  propsName: 'regexValidation',
  lable: 'Regex Validation',
  items: [
    {
      label: 'None',
      value: ''
    },
    {
      label: 'Lower- or Upper-case Alpha Numeric only',
      value: '/^(?=.*?[a-zA-Z])[a-zA-Z0-9]+$'
    },
    {
      label: 'Lower- or Upper-case Alpha Numeric and Numbers only',
      value: '/^(?=.*?\d)[a-zA-Z0-9]+$'
    },
    {
      label: 'Email Address',
      value: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
    },
    {
      label: 'Integer Number with min and max values',
      value: '1'
    },
    {
      label: 'URL',
      value: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    },
    {
      label: 'Custom Regular Expression',
      value: 'customRegex'
    }
  ],
  value: {
    pattern: '',
    value: '',
    message: ''
  },
  type: 'Options'
};

export const tableColumn = {
  propsName: 'tableColumns',
  label: 'Column Header',
  value: [],
  type: 'TextInput'
};

export const tableRows = {
  propsName: 'tableRows',
  label: 'Table Rows',
  value: [],
  type: 'TextInput'
};

export const selectRow = {
  propsName: 'selectablerows',
  label: 'Selectable Rows',
  value: false,
  type: 'Toggle'
};

export const pageSize = {
  propsName: 'pagesize',
  label: 'Page Size',
  value: '',
  type: 'TextInput'
};

// New constant for Options type
export const options = {
  propsName: 'options',
  label: 'Options',
  value: [
    {
      label: '',
      id: '',
      value: ''
    }
  ],
  type: 'Options'
};

export const labelA = {
  propsName: 'labelA',
  label: 'Label A',
  value: 'Yes',
  type: 'TextInput'
};

export const labelB = {
  propsName: 'labelB',
  label: 'Label B',
  value: 'No',
  type: 'TextInput'
};

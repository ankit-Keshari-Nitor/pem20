// import { Checkbox, Input, Radio, RadioGroup, Stack, Switch, Textarea } from '@chakra-ui/react';
import { Checkbox, TextArea, TextInput, Toggle, Modal, TreeView, TreeNode, Button } from '@carbon/react';
import * as React from 'react';
// import { ValueEditorProps } from 'react-querybuilder';
import { ValueSelector, getFirstOption, standardClassnames, useValueEditor } from 'react-querybuilder';
import { ElippsisIcon } from '../../../icons';
import { useState } from 'react';

// type ChakraValueEditorProps = ValueEditorProps & { extraProps?: Record<string, any> };

const CarbonValueEditor = (allProps) => {
  const {
    fieldData,
    operator,
    value,
    handleOnChange,
    title,
    className,
    type,
    inputType,
    values = [],
    listsAsArrays,
    parseNumbers,
    separator,
    valueSource: _vs,
    testID,
    disabled,
    selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector,
    extraProps,
    ...props
  } = allProps;

  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const { valueAsArray, multiValueHandler } = useValueEditor({
    handleOnChange,
    inputType,
    operator,
    value,
    type,
    listsAsArrays,
    parseNumbers,
    values
  });

  if (operator[1] === 'null' || operator[1] === 'notNull') {
    return null;
  }

  const operandSelector = (selectedValue) => {
    //operandOne('Disabled-2');
    handleOnChange(selectedValue);
    setOpenCancelDialog(false);
  };

  const Temp = (
    <TreeView label="Demo Data">
      <TreeNode label="Enabled-1">
        <TreeNode label="Disabled-1" onClick={(e) => operandSelector('Disabled-1')} />
      </TreeNode>
      <TreeNode label="Enabled-2">
        <TreeNode label="Disabled-2" onClick={(e) => operandSelector('Disabled-2')} />
      </TreeNode>
    </TreeView>
  );

  const placeHolderText = fieldData?.placeholder ?? '';
  const inputTypeCoerced = ['in', 'notIn'].includes(operator[1]) ? 'text' : inputType || 'text';

  if ((operator[1] === 'between' || operator[1] === 'notBetween') && (type === 'select' || type === 'text')) {
    const editors = ['from', 'to'].map((key, i) => {
      if (type === 'text') {
        return (
          <TextInput
            key={key}
            type={inputTypeCoerced}
            value={valueAsArray[i] ?? ''}
            //isDisabled={disabled}
            className={standardClassnames.valueListItem}
            placeholder={placeHolderText}
            onChange={(e) => multiValueHandler(e.target.value, i)}
            {...extraProps}
          />
        );
      }
      return (
        <SelectorComponent
          {...props}
          key={key}
          className={standardClassnames.valueListItem}
          handleOnChange={(v) => multiValueHandler(v, i)}
          disabled={disabled}
          value={valueAsArray[i] ?? getFirstOption(values)}
          options={values}
          listsAsArrays={listsAsArrays}
        />
      );
    });
    return (
      <span data-testid={testID} className={className} title={title}>
        {editors[0]}
        {separator}
        {editors[1]}
      </span>
    );
  }

  // eslint-disable-next-line default-case
  switch (type) {
    case 'select':
      return <SelectorComponent {...props} className={className} title={title} value={value} disabled={disabled} handleOnChange={handleOnChange} options={values} />;

    case 'multiselect':
      return (
        <ValueSelector
          {...props}
          className={className}
          title={title}
          value={value}
          disabled={disabled}
          handleOnChange={handleOnChange}
          options={values}
          multiple
          listsAsArrays={listsAsArrays}
        />
      );

    case 'textarea':
      return (
        <TextArea
          value={value}
          title={title}
          //isDisabled={disabled}
          className={className}
          placeholder={placeHolderText}
          onChange={(e) => handleOnChange(e.target.value)}
          {...extraProps}
        />
      );

    case 'switch':
      return <Toggle className={className} isChecked={!!value} title={title} onChange={(e) => handleOnChange(e.target.checked)} {...extraProps} />;

    case 'checkbox':
      return <Checkbox className={className} title={title} onChange={(e) => handleOnChange(e.target.checked)} isChecked={!!value} {...extraProps} />;

    // case 'radio':
    //   return (
    //     <RadioGroup
    //       className={className}
    //       title={title}
    //       value={value}
    //       onChange={handleOnChange}
    //       isDisabled={disabled}
    //       {...extraProps}>
    //       <Stack direction="row">
    //         {values.map(v => (
    //           <Radio key={v.name} value={v.name}>
    //             {v.label}
    //           </Radio>
    //         ))}
    //       </Stack>
    //     </RadioGroup>
    //   );
  }

  return (
    <>
      <TextInput
        type={inputTypeCoerced}
        value={value}
        title={title}
        //isDisabled={disabled}
        className={className}
        placeholder={'Operand'}
        onChange={(e) => handleOnChange(e.target.value)}
        {...extraProps}
      />
      <Button size="md" className="opt-btn" kind="secondary" renderIcon={ElippsisIcon} onClick={() => setOpenCancelDialog(true)}></Button>
      <Modal open={openCancelDialog} onRequestClose={() => setOpenCancelDialog(false)} passiveModal>
        {Temp}
      </Modal>
    </>
  );
};

export default CarbonValueEditor;

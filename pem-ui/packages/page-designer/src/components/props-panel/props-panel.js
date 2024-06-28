import React, { useEffect } from 'react';
import { Toggle, TextInput, Button, Select, SelectItem, Tabs, TabList, Tab, TabPanels, TabPanel, Accordion, AccordionItem, Checkbox } from '@carbon/react';

import './props-panel.scss';
import { CUSTOM_COLUMN, SUBTAB, ROW, TAB, CUSTOM_TITLE, OPTIONS, CUSTOMREGEX, TABLECOLUMNS, TABLEROWS, TABLE_HEADER } from '../../constants/constants';
import { collectPaletteEntries } from '../../utils/helpers';

export default function PropsPanel({ layout, selectedFiledProps, handleSchemaChanges, columnSizeCustomization, onFieldDelete, componentMapper, replaceComponet }) {
  const [editableProps, setEditableProps] = React.useState({});
  const [advanceProps, setAdvanceProps] = React.useState([]);
  const [componentStyle, setComponentStyle] = React.useState([]);
  const [componentType, setComponentType] = React.useState();
  const [componentTypes, setComponentTypes] = React.useState([]);
  const [tabSubTitle, setTabSubTitle] = React.useState();
  const [options, setOptions] = React.useState([]);
  const [tableHeader, setTableHeader] = React.useState([]);
  const [tableRows, setTableRows] = React.useState([]);
  // const [tableRowColumnOpt, setTableRowColumnOpt] = React.useState([]);
  const [customRegexPattern, setCustomRegexPattern] = React.useState(false);
  const items = [
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: '10' },
    { text: '11' },
    { text: '12' },
    { text: '13' },
    { text: '14' },
    { text: '15' },
    { text: '16' }
  ];
  useEffect(() => {
    setEditableProps(selectedFiledProps?.component?.editableProps);
    setAdvanceProps(selectedFiledProps?.component?.advanceProps);
    setComponentStyle(selectedFiledProps?.component?.style);
    setTabSubTitle(selectedFiledProps?.component?.tabTitle);
    setComponentType(selectedFiledProps.component.type);
    setComponentTypes(collectPaletteEntries(componentMapper));
    setOptions(selectedFiledProps?.component?.editableProps?.Basic.find((prop) => prop.type === 'Options')?.value || []);
    setTableHeader(selectedFiledProps?.component?.editableProps?.Basic.find((prop) => prop.propsName === TABLECOLUMNS)?.value || []);
    setTableRows(selectedFiledProps?.component?.editableProps?.Basic.find((prop) => prop.propsName === TABLEROWS)?.value || []);
  }, [selectedFiledProps, componentMapper, customRegexPattern]);

  const handleChange = (e) => {
    columnSizeCustomization(e.target.value, selectedFiledProps.currentPathDetail);
    setComponentStyle([{ labelText: 'Column Size', text: e.target.value }]);
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, { label: '' }]);
  };

  const handleOptionChange = (index, value, key = '') => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index].id = `${selectedFiledProps?.id}-${index}`;
      key == 'label' ? (newOptions[index].label = value) : (newOptions[index].value = value);
      handleSchemaChanges(selectedFiledProps?.id, 'Basic', 'options', newOptions, selectedFiledProps?.currentPathDetail);
      return newOptions;
    });
  };

  const handleAddHeader = () => {
    setTableHeader((preHeader) => [
      ...preHeader,
      {
        key: '',
        header: '',
        colSpan: '6',
        searchable: false,
        sortable: false,
        required: false
      }
    ]);
  };

  const handleAddRow = (tableolumns) => {
    const tableRow = {};
    tableolumns.map((item)=>{
      tableRow[item.key] = '';
    })
    setTableRows((preRows)=> [...preRows, {id:'a', ...tableRow}])
  }

  const handleRowOpt = (index, value, key) => {
    setTableRows((prevRow)=>{
      const rows = [...prevRow];
      rows[index][key] = value;
      handleSchemaChanges(selectedFiledProps?.id, 'Basic', TABLEROWS, rows, selectedFiledProps?.currentPathDetail);
      return rows;
    })
  }

  const handleTableColumn = (index) => {
    const updatedHeader = tableHeader.splice(index, 1);
    setTableHeader(updatedHeader);
    handleSchemaChanges(selectedFiledProps?.id, 'Basic', TABLECOLUMNS, updatedHeader, selectedFiledProps?.currentPathDetail);
  }

  const handleHeaderChange = (index, value, key = '') => {
    setTableHeader((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index][key] = value;
      handleSchemaChanges(selectedFiledProps?.id, 'Basic', TABLECOLUMNS, newOptions, selectedFiledProps?.currentPathDetail);
      return newOptions;
    });
  };

  const isLastChild = (path, layout) => {
    if (path && path.length > 0) {
      let childLength = false;
      let index = path[0];
      if (path.length === 1) {
        childLength = layout[0]?.children?.length > 1 ? true : false;
      } else {
        path.shift();
        return isLastChild(path, layout[index]?.children);
      }
      return childLength;
    }
  };

  const handleComponentTypeChange = (e) => {
    const newComponent = componentTypes.filter((items) => items.component.type === e.target.value)[0];
    replaceComponet(e, selectedFiledProps.currentPathDetail, newComponent);
    setComponentType(e.target.value);
  };

  const handleRegexOption = (e, items, message, id, propsName, path) => {
    const newRegex = items.filter((items) => items.value === e.target.value)[0];
    const newValue = { pattern: newRegex.label, value: newRegex.value, message: message };
    if (e.target.value === CUSTOMREGEX) {
      newValue.customRegex = '';
      setCustomRegexPattern(true);
    }
    handleSchemaChanges(id, 'advance', propsName, newValue, path);
  };
  return (
    <div className="right-palette-container">
      {selectedFiledProps && (
        <>
          <Tabs>
            <TabList aria-label="List of tabs" contained>
              <Tab>Properties</Tab>
              <Tab>Validators</Tab>
              <Tab>Condition</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="tab-panel">
                {/* Component Types Select */}
                {componentStyle === undefined && tabSubTitle === undefined && (
                  <Select
                    className="component-types"
                    id={String(selectedFiledProps.id)}
                    labelText="Component Types"
                    onChange={handleComponentTypeChange}
                    defaultValue={componentType}
                    value={componentType}
                  >
                    {componentTypes.map((item, index) => {
                      return <SelectItem key={index} value={item.component.type} text={item.component.type} />;
                    })}
                  </Select>
                )}
                {/* To Show the Add Tab Button */}
                {selectedFiledProps?.type === TAB && (
                  <Button
                    onClick={(e) => {
                      handleSchemaChanges(selectedFiledProps?.id, SUBTAB, '', 1, selectedFiledProps?.currentPathDetail);
                    }}
                  >
                    Add Tab
                  </Button>
                )}
                {/* To Show the Add Column Button */}
                {selectedFiledProps?.type === ROW && (
                  <Button
                    onClick={(e) => {
                      handleSchemaChanges(selectedFiledProps?.id, CUSTOM_COLUMN, '', 1, selectedFiledProps?.currentPathDetail);
                    }}
                  >
                    Add Column
                  </Button>
                )}
                {/* Basic Properties Field  */}
                {editableProps &&
                  Object.keys(editableProps).map((key, idx) => {
                    return (
                      <>
                        {editableProps[key] && editableProps[key].length > 0 && (
                          <>
                            {editableProps[key].map((item, idx) => {
                              return (
                                key === 'Basic' &&
                                (item.type === 'TextInput' ? (
                                  item.propsName === TABLECOLUMNS ? (
                                    <div className="table-header">
                                      <span>
                                        <label>Column Header</label>
                                        <Button size="sm" className='add-header' onClick={handleAddHeader}>
                                          Add Header
                                        </Button>
                                      </span>
                                      <Accordion>
                                        {tableHeader.map((header, index) => (
                                          <AccordionItem title={`Column-${index}`}>
                                            <TextInput
                                              key={`key-${idx}-${index}`}
                                              id={String(`key-${idx}`)}
                                              className="right-palette-form-item "
                                              labelText={'Key'}
                                              value={header?.key}
                                              onChange={(e) => handleHeaderChange(index, e.target.value, 'key')}
                                            />
                                            <TextInput
                                              key={`value-${idx}-${index}`}
                                              id={String(`value-${idx}`)}
                                              className="right-palette-form-item "
                                              labelText={'Value'}
                                              value={header?.header}
                                              onChange={(e) => handleHeaderChange(index, e.target.value, 'header')}
                                            />
                                            {/* <TextInput
                                              key={`colspan-${idx}-${index}`}
                                              id={String(`colspan-${idx}`)}
                                              className="right-palette-form-item "
                                              labelText={'Column Width'}
                                              value={header?.colSpan}
                                              onChange={(e) => handleHeaderChange(index, e.target.value, 'colSpan')}
                                            /> */}
                                            <Checkbox
                                              key={`searchable-${idx}-${index}`}
                                              id={`searchable-${idx}-${index}`}
                                              labelText="Searchable"
                                              checked={header.searchable}
                                              onChange={(e) => handleHeaderChange(index, !header?.searchable, 'searchable')}
                                            />
                                            <Checkbox
                                              key={`sortable-${idx}-${index}`}
                                              id={`sortable-${idx}-${index}`}
                                              labelText="Sortable"
                                              checked={header.sortable}
                                              onChange={(e) => handleHeaderChange(index, !header?.sortable, 'sortable')}
                                            />
                                            <Checkbox
                                              key={`required-${idx}-${index}`}
                                              id={`required-${idx}-${index}`}
                                              labelText="Required"
                                              checked={header.required}
                                              onChange={(e) => handleHeaderChange(index, !header?.required, 'required')}
                                            />
                                            <Button size="sm" className= 'delete-table-column' onClick={()=>handleTableColumn(index)}>
                                              Delete Column
                                            </Button>
                                            {/* <Toggle 
                                                key={`searchable-${idx}-${index}`}
                                                id={String(`searchable-${idx}-${index}`)}
                                                //labelText={''}
                                                defaultToggled={Boolean(false)}
                                                toggled={Boolean(false)}
                                                //onClick={(e) => handleSchemaChanges(selectedFiledProps?.id, key, item.propsName, !item.value, selectedFiledProps?.currentPathDetail)}
                                                hideLabel
                                              /> */}
                                          </AccordionItem>
                                        ))}
                                      </Accordion>
                                    </div>
                                  ) : item.propsName === TABLEROWS ? (
                                    <div className="table-row">
                                    <span>
                                      <label>Table Row</label>
                                      <Button size="sm" className='add-row' onClick={()=>handleAddRow(tableHeader)}>
                                        Add Row
                                      </Button>
                                    </span>
                                    {console.log('tableRow>>>',tableRows)}
                                    <Accordion>
                                      {tableRows.map((rowValue, index) => (
                                        <AccordionItem title={`Row-${index}`}>
                                          {/* <Select id={String(idx)} labelText="Column" onChange={(e)=>handleRowOpt(index,e.target.value)}>
                                            {tableHeader.map((item, index) => {
                                              return <SelectItem key={index} value={item.key} text={item.key} />;
                                            })}
                                          </Select> */}
                                          {tableHeader.map((item, colidex) => {
                                              return <TextInput
                                              key={`${item.key}-${idx}-${colidex}`}
                                              id={String(`${item.key}-${idx}`)}
                                              className="right-palette-form-item "
                                              labelText={item.key}
                                              value={rowValue[item.key]}
                                              onChange={(e) => handleRowOpt(index, e.target.value, item.key)}
                                            />;
                                            })}
                                          
                                          <Button size="sm" className= 'delete-table-column'>
                                            Delete Row
                                          </Button>
                                        </AccordionItem>
                                      ))}
                                    </Accordion>
                                  </div>
                                  ) : (
                                    <TextInput
                                      key={idx}
                                      id={String(idx)}
                                      className="right-palette-form-item "
                                      labelText={item.label}
                                      value={item.value}
                                      invalid={item.invalid ? item.invalid : false}
                                      invalidText={item.invalidText ? item.invalidText : null}
                                      onChange={(e) => handleSchemaChanges(selectedFiledProps?.id, key, item.propsName, e.target.value, selectedFiledProps?.currentPathDetail)}
                                    />
                                  )
                                ) : (
                                  item.type === 'Toggle' && (
                                    <ul key={idx}>
                                      <li>
                                        <Toggle
                                          key={idx}
                                          id={'toggle-' + key + '-' + String(idx) + '-' + selectedFiledProps?.id}
                                          className="right-palette-form-item "
                                          labelText={item.label}
                                          defaultToggled={Boolean(item.value)}
                                          toggled={Boolean(item.value)}
                                          onClick={(e) => handleSchemaChanges(selectedFiledProps?.id, key, item.propsName, !item.value, selectedFiledProps?.currentPathDetail)}
                                          hideLabel
                                        />
                                      </li>
                                    </ul>
                                  )
                                ))
                              );
                            })}
                          </>
                        )}
                      </>
                    );
                  })}
                {/* Option Section */}
                {options.length > 0 && (
                  <div className="options-section">
                    <label className="cds--label">Options</label>
                    {options.map((option, index) => {
                      return (
                        <>
                          <div key={index} className="option-input">
                            <label className="cds--label">Label {index}</label>
                            <TextInput id={`option-${index}`} value={option?.label} onChange={(e) => handleOptionChange(index, e.target.value, 'label')} />
                          </div>
                          <div key={index} className="option-input">
                            <label className="cds--label">value {index}</label>
                            <TextInput id={`option-${index}`} value={option?.value} onChange={(e) => handleOptionChange(index, e.target.value, 'value')} />
                          </div>
                        </>
                      );
                    })}
                    <Button size="sm" onClick={handleAddOption}>
                      Add Option
                    </Button>
                  </div>
                )}
                {/* Column Size Style  */}
                {componentStyle && componentStyle.length > 0 && (
                  <>
                    {componentStyle.map((styleProps, idx) => {
                      return (
                        <Select id={String(idx)} labelText="Column Size" onChange={handleChange} defaultValue={styleProps.text} value={styleProps.text}>
                          {items.map((item, index) => {
                            return <SelectItem key={index} value={item.text} text={item.text} />;
                          })}
                        </Select>
                      );
                    })}
                    {/* Column Delete  */}
                    {isLastChild(selectedFiledProps?.currentPathDetail.split('-').slice(0, -1), layout) && (
                      <div className="delete-column">
                        <Button
                          kind="danger--tertiary"
                          onClick={(e) => {
                            onFieldDelete(e, selectedFiledProps?.currentPathDetail);
                          }}
                        >
                          Delete Column
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {/* Tab SubTitle  */}
                {(tabSubTitle || tabSubTitle === '') && (
                  <>
                    <TextInput
                      key="TabTitle"
                      id="TabTitle"
                      className="right-palette-form-item"
                      labelText="Tab Title"
                      value={tabSubTitle}
                      onChange={(e) => {
                        handleSchemaChanges(selectedFiledProps?.id, CUSTOM_TITLE, 'tabTitle', e.target.value, selectedFiledProps?.currentPathDetail);
                      }}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel className="tab-panel">
                {/* Advance Properties Field  */}
                {advanceProps && advanceProps.length > 0 && (
                  <>
                    {advanceProps.map((advncProps, idx) => {
                      return (
                        <>
                          {advncProps.type === 'TextInput' && (
                            <TextInput
                              key={idx}
                              id={String(idx)}
                              className="right-palette-form-item"
                              labelText={advncProps.label}
                              value={advncProps.value.value}
                              onChange={(e) => {
                                if (isNaN(e.target.value)) {
                                  e.preventDefault();
                                  handleSchemaChanges(
                                    selectedFiledProps?.id,
                                    'advance',
                                    advncProps.propsName,
                                    { value: e.target.value, message: advncProps.value.message },
                                    selectedFiledProps?.currentPathDetail
                                  );
                                } else {
                                  handleSchemaChanges(
                                    selectedFiledProps?.id,
                                    'advance',
                                    advncProps.propsName,
                                    { value: e.target.value, message: advncProps.value.message },
                                    selectedFiledProps?.currentPathDetail
                                  );
                                }
                              }}
                            />
                          )}
                          {advncProps.type === OPTIONS && (
                            <Select
                              className="regex-types"
                              id={String(selectedFiledProps.id)}
                              labelText={advncProps.label}
                              onChange={(e) =>
                                handleRegexOption(
                                  e,
                                  advncProps?.items,
                                  advncProps.value.message,
                                  selectedFiledProps?.id,
                                  advncProps.propsName,
                                  selectedFiledProps?.currentPathDetail
                                )
                              }
                              defaultValue={advncProps.value.value}
                              value={advncProps.value.value}
                            >
                              {advncProps?.items.map((item, index) => {
                                return <SelectItem key={index} value={item.value} text={item.label} />;
                              })}
                            </Select>
                          )}
                          {(advncProps?.value?.customRegex || advncProps?.value?.customRegex === '') && (
                            <TextInput
                              key={`customregex-${idx}`}
                              id={`customregex-${String(idx)}`}
                              className="right-palette-form-item"
                              labelText={'Custom Regex'}
                              value={advncProps.value.customRegex}
                              onChange={(e) => {
                                if (isNaN(e.target.value)) {
                                  e.preventDefault();
                                  handleSchemaChanges(
                                    selectedFiledProps?.id,
                                    'advance',
                                    advncProps.propsName,
                                    { pattern: advncProps.value.pattern, value: advncProps.value.value, customRegex: e.target.value, message: advncProps.value.message },
                                    selectedFiledProps?.currentPathDetail
                                  );
                                } else {
                                  handleSchemaChanges(
                                    selectedFiledProps?.id,
                                    'advance',
                                    advncProps.propsName,
                                    { pattern: advncProps.value.pattern, value: advncProps.value.value, customRegex: e.target.value, message: advncProps.value.message },
                                    selectedFiledProps?.currentPathDetail
                                  );
                                }
                              }}
                            />
                          )}
                          {advncProps.type === 'Toggle' && (
                            <Toggle
                              key={idx}
                              id={'toggle-' + String(idx) + '-' + selectedFiledProps?.id}
                              className="right-palette-form-item "
                              labelText={advncProps.label}
                              defaultToggled={Boolean(advncProps.value.value)}
                              toggled={Boolean(advncProps.value.value)}
                              onClick={(e) =>
                                handleSchemaChanges(
                                  selectedFiledProps?.id,
                                  'advance',
                                  advncProps.propsName,
                                  { value: !advncProps.value.value, message: advncProps.value.message },
                                  selectedFiledProps?.currentPathDetail
                                )
                              }
                              hideLabel
                            />
                          )}
                          <TextInput
                            key={`${idx}-'message'`}
                            id={String(idx)}
                            className="right-palette-form-item"
                            labelText={'Message'}
                            value={advncProps.value.message}
                            onChange={(e) => {
                              if (isNaN(e.target.value)) {
                                e.preventDefault();
                                advncProps.type === OPTIONS
                                  ? handleSchemaChanges(
                                      selectedFiledProps?.id,
                                      'advance',
                                      advncProps.propsName,
                                      { ...advncProps.value, message: e.target.value },
                                      selectedFiledProps?.currentPathDetail
                                    )
                                  : handleSchemaChanges(
                                      selectedFiledProps?.id,
                                      'advance',
                                      advncProps.propsName,
                                      { value: advncProps.value.value, message: e.target.value },
                                      selectedFiledProps?.currentPathDetail
                                    );
                              } else {
                                advncProps.type === OPTIONS
                                  ? handleSchemaChanges(
                                      selectedFiledProps?.id,
                                      'advance',
                                      advncProps.propsName,
                                      { pattern: advncProps.value.pattern, value: advncProps.value.value, message: e.target.value },
                                      selectedFiledProps?.currentPathDetail
                                    )
                                  : handleSchemaChanges(
                                      selectedFiledProps?.id,
                                      'advance',
                                      advncProps.propsName,
                                      { value: advncProps.value.value, messag: e.target.value },
                                      selectedFiledProps?.currentPathDetail
                                    );
                              }
                            }}
                          />
                        </>
                      );
                    })}
                  </>
                )}
                {/* Validation Properties Field  */}
                {editableProps &&
                  Object.keys(editableProps).map((key, idx) => {
                    return (
                      <>
                        {editableProps[key] && editableProps[key].length > 0 && (
                          <>
                            {/* {editableProps[key].map((item, idx) => {
                              return (
                                key === 'Condition' && (
                                  <ul key={idx}>
                                    <li>
                                      <Toggle
                                        key={idx}
                                        id={'toggle-' + String(idx) + '-' + selectedFiledProps?.id}
                                        className="right-palette-form-item "
                                        labelText={item.label}
                                        defaultToggled={item.value}
                                        toggled={item.value}
                                        onClick={(e) => handleSchemaChanges(selectedFiledProps?.id, key, item.propsName, !item.value, selectedFiledProps?.currentPathDetail)}
                                        hideLabel
                                      />
                                    </li>
                                  </ul>
                                )
                              );
                            })} */}
                          </>
                        )}
                      </>
                    );
                  })}
              </TabPanel>
              <TabPanel className="tab-panel">Conditional Props</TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </div>
  );
}

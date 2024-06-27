import React, { useEffect, useState } from 'react';
import { DataTable as CarbonDataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow, TableSelectAll, Pagination, TableContainer } from '@carbon/react';
import { TextInputIcon } from './../icons';
import { FORM_FIELD_GROUPS, FORM_FIELD_LABEL, FORM_FIELD_TYPE } from '../constant/form-field-type';
import { NameLabel, helperText, isRequired, labelText, pageSize, placeHolder, readOnly, selectRow, tableColumn, valueLabel } from '../constant';

const DataTable = ({ field, id, currentPath, onChangeHandle, previewMode }) => {
  const { labelText, helperText, disabled, isRequired, selectablerows, pagesize, tableColumns, ...rest } = field;
  const [headers, setHeaders] = useState(tableColumns ? tableColumns : []);
  const [selectRow, setSelectRow] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: Number(pagesize) || 20
  });
  const dataRows = [
    {
      id: 'a',
      column0: 'Load balancer 1',
      column1: 'Disabled'
    },
    {
      id: 'b',
      column0: 'Load balancer 2',
      column1: 'Starting'
    },
    {
      id: 'c',
      column0: 'Load balancer 3',
      column1: 'Active'
    }
  ];
  const [rows, setRows] = useState(dataRows);


  
  useEffect(()=>{
    setHeaders(tableColumns);
  },[tableColumns])

  useEffect(()=>{
    setSelectRow(selectablerows ? selectablerows : false)
  },[selectablerows])

  useEffect(()=>{
        setPagination({
            page: 1,
            pageSize: Number(pagesize) || 20
        })
        setRows(dataRows.slice(0,Number(pagesize)))
  },[pagesize])

  useEffect(()=>{
    const endIdx = pagination.page*pagination.pageSize;
    const startIdx = endIdx - pagination.pageSize;
    setRows(dataRows.slice(startIdx,endIdx))
  },[pagination])


//   const headers = [
//     {
//       key: 'column0',
//       header: 'column0',
//     },
//     {
//       key: 'column1',
//       header: 'column1'
//     }
//   ];
  return (
    <>
      <CarbonDataTable rows={rows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getSelectionProps }) => (
            <TableContainer>
                <Table {...getTableProps()}>
                    <TableHead>
                    <TableRow>
                        {selectRow && <TableSelectAll {...getSelectionProps()} data-testid="row-selection" />}
                        {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header, isSortable: header.sortable })}>{header.header}</TableHeader>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.length > 0 ? (rows.map((row) => (
                        <TableRow {...getRowProps({ row })}>
                        {selectRow && <TableSelectRow data-testid="row-selection" {...getSelectionProps({ row })} />}
                        {row.cells.map((cell) => (
                            <TableCell key={cell.id}>
                            {cell.value}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))) : <TableRow>
                        <div>No Record Found</div>
                    </TableRow> }
                    </TableBody>
                </Table>
                <Pagination
                backwardText="Previous page"
                forwardText="Next page"
                itemsPerPageText="Items per page:"
                onChange={({ page, pageSize }) => {
                    setPagination({ page, pageSize });
                  }}
                page={pagination.page}
                pageSize={pagination.pageSize}
                pageSizes={[pagesize ? pagesize : 20]}
                size="md"
                totalItems={103}
            />
            </TableContainer>
        )}
      </CarbonDataTable>
    </>
  );
};

export default DataTable;

// Config of Accordion for Left Palette & Right Palette
DataTable.config = {
  type: FORM_FIELD_TYPE.DATATABLE,
  label: FORM_FIELD_LABEL.DATATABLE,
  group: FORM_FIELD_GROUPS.BASIC_INPUT,
  icon: <TextInputIcon />,
  editableProps: {
    Basic: [NameLabel, labelText, valueLabel, helperText, placeHolder, readOnly, selectRow, pageSize, tableColumn],
    Condition: []
  },
  advanceProps: [isRequired]
};
// import { TextInput as CarbonTextInput } from '@carbon/react';
// import {
//   FORM_FIELD_TYPE,
//   minProps,
//   maxProps,
//   readOnly,
//   helperText,
//   FORM_FIELD_LABEL,
//   FORM_FIELD_GROUPS,
//   isRequired,
//   labelText,
//   isDisabled,
//   placeHolder,
//   valueLabel,
//   NameLabel,
//   regexValidation
// } from '../constant';
// import { TextInputIcon } from './../icons';

// const type = FORM_FIELD_TYPE.TEXT_INPUT;

// const DataTable = ({ field, id, currentPath, onChangeHandle, previewMode }) => {
//   const { labelText, helperText, disabled, value, isRequired, min, max, ...rest } = field;
//   const [fieldValue, setFieldValue] = useState();

//   useEffect(() => {
//     if (previewMode) {
//       setFieldValue(value ? value : '');
//     }
//   }, [field, previewMode, value]);
//   return (
//     <>
//       <CarbonTextInput
//         type={FORM_FIELD_TYPE.TEXT}
//         data-testid={id}
//         id={id}
//         labelText={labelText}
//         helperText={helperText}
//         disabled={disabled}
//         defaultValue={''}
//         value={fieldValue}
//         onChange={(e) => {
//           previewMode && onChangeHandle(currentPath, e.target.value);
//           setFieldValue(e.target.value);
//         }}
//         {...rest}
//       />
//       {/* <div style={rest.isRequiredInvalid ? { display: 'block', color: '#da1e28', fontSize: '0.75rem' } : { display: 'none' }}>This field is required!!</div> */}
//     </>
//   );
// };

// export default DataTable;

// // Config of Accordion for Left Palette & Right Palette
// DataTable.config = {
//   type,
//   label: FORM_FIELD_LABEL.TEXT_INPUT,
//   group: FORM_FIELD_GROUPS.BASIC_INPUT,
//   icon: <TextInputIcon />,
//   editableProps: {
//     Basic: [labelText, valueLabel, helperText, NameLabel, placeHolder, isDisabled, readOnly],
//     Condition: []
//   },
//   advanceProps: [minProps, maxProps, regexValidation, isRequired]
// };

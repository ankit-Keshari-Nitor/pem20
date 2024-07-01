import React, { useEffect, useRef, useState } from 'react';
import { DataTable as CarbonDataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow, TableSelectAll, Pagination, TableContainer } from '@carbon/react';
import { TextInputIcon } from './../icons';
import { FORM_FIELD_GROUPS, FORM_FIELD_LABEL, FORM_FIELD_TYPE } from '../constant/form-field-type';
import { NameLabel, helperText, isRequired, labelText, pageSize, placeHolder, readOnly, selectRow, tableColumn, tableRows as tableRowsData } from '../constant';

const DataTable = ({ field, id, currentPath, onChangeHandle, previewMode }) => {
  const { labelText, helperText, disabled, isRequired, selectablerows, pagesize, tableRows, tableColumns, ...rest } = field;
  const [headers, setHeaders] = useState(tableColumns ? tableColumns : []);
  const [selectRow, setSelectRow] = useState(false);
  let sortCheck = useRef(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: Number(pagesize) || 20
  });

  const [dataRows, setDataRows] = useState([]);
  const [rowsp, setRowsp] = useState([]);


  useEffect(()=>{
    setDataRows(tableRows? tableRows : []);
    sortCheck.current = true;
    tableRows && setRowsp(tableRows)
  },[tableRows])

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
        setRowsp(dataRows.slice(0,Number(pagesize)))
  },[pagesize])

  useEffect(()=>{
    const endIdx = pagination.page*pagination.pageSize;
    const startIdx = endIdx - pagination.pageSize;
    setRowsp(dataRows.slice(startIdx,endIdx))
  },[pagination])
  return (
    <>
    {console.log('new row data>>',rowsp)}
      <CarbonDataTable rows={rowsp} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getSelectionProps }) => (
            <TableContainer title={labelText} description={helperText}>
              {
                console.log('test>>>>',rows, sortCheck.current)
              
              }
              {
                sortCheck.current && (
                rows.length > 0 && rows.map((row, idx) => {
                  console.log('rowLoop>>',row)
                  rowsp.map((orgRow, rowspId)=>{
                    if(orgRow.id === row.id){
                      row.cells.map((cell, cellId)=>{
                        cell.value = rowsp[rowspId][headers[cellId].key]
                      })
                    }
                  })
                }),
                sortCheck.current = false,
                console.log('workingfine')
                ) 

              }
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
                    {rows.length > 0 ? (rows.map((row, idx) => (
                      <>
                       {/* {console.log('mmmmm',rowsp) }
                       {console.log('mmmmm roes',rows) }
                       {console.log('mmmmm headers',headers) } */}
                       {console.log('dmsds>>>row',idx, row)}
                        <TableRow {...getRowProps({ row })}>
                        {selectRow && <TableSelectRow data-testid="row-selection" {...getSelectionProps({ row })} />}
                        {row.cells.map((cell, cellId) => (
                            <TableCell key={cell.id}>
                              {/* {console.log('row',idx, headers[cellId].key)}  = rowsp[idx][headers[cellId].key]*/}
                            {//cell.value
                              cell.value
                            }
                            </TableCell>
                        ))}
                        </TableRow>
                        </>
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
                totalItems={dataRows?.length}
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
    Basic: [NameLabel, labelText, helperText, placeHolder, readOnly, selectRow, pageSize, tableColumn, tableRowsData],
    Condition: []
  },
  advanceProps: [isRequired]
};
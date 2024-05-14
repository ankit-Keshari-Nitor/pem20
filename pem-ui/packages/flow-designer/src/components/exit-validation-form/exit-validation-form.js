import React, { useState } from 'react';
import { TextArea, Grid, Column } from '@carbon/react';
import './exit-validation-form.scss';
import CarbonWrapper from './condition-builder-wrapper/carbon-wrapper';
import QueryBuilder, { defaultOperators, formatQuery } from 'react-querybuilder';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';

export default function ExitValidationFrom() {
  const fields = [
    { name: 'firstName', label: 'DataType-1' },
    { name: 'lastName', label: 'DataType-2', operators: defaultOperators.filter((op) => op.name === '=' || op.name === 'in') }
  ];
  const initialQuery = {
    combinator: 'and',
    rules: [
      { field: 'firstName', operator: ['demo-1', 'beginsWith'], value: 'Stev' },
      { field: 'lastName', operator: ['demo-2', 'in'], value: 'Vai,Vaughan' }
    ]
  };

  const combinator = [
    { name: 'and', value: 'and', label: 'AND' },
    { name: 'or', value: 'or', label: 'OR' }
  ];
  const [query, setQuery] = useState(initialQuery);
  return (
    <div className="query-builder">
      <CarbonWrapper>
        {/* <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}> */}
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          combinators={combinator}
          controlClassnames={{ queryBuilder: 'queryBuilder-branches', body: 'inline-indycomb-left' }}
          // __RQB_PROPS__
        />
        {/* </QueryBuilderDnD> */}
      </CarbonWrapper>
      {/* <h4>Query</h4>
      <pre>
        <code>{formatQuery(query, 'json')}</code>
      </pre> */}
      <Grid className="grid-margin grid-margin-top">
        <Column lg={16}>
          <TextArea placeholder="Enter Text" labelText="Error Message" rows={4} id="text-area-1" />
        </Column>
      </Grid>
    </div>
  );
}

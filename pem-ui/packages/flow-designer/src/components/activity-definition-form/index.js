import React from 'react';
import React, { useState } from 'react';
import { Column, Grid, Modal, Select, SelectItem } from '@carbon/react';
import ActivityTaskDefinition from '../activity-task-definition';

import ActivityVersions from './activity-versions-dropdown';
export default function ActivityDefinitionForm(props) {
  const { activityDefKey, versions = [], readOnly, selectedVersion, onVersionSelection, editDefinitionProp, activityOperation, activityDefinitionData } = props;
  return (
    <div className="block-properties-container">
      <div className="title-bar">
        <span className="title">
          <Grid>
            <Column lg={4} md={3} sm={2}>
              <b>Define Activity</b>
            </Column>
            <Column lg={2} md={2} sm={1} className="activity-active">
              Active
            </Column>
            <ActivityVersions {...props} />
          </Grid>
        </span>
        <div className="icon">
          <span onClick={() => setOpenExpandMode(true)} className="icon">
            <ExpandIcon />
          </span>
          <span onClick={() => setOpenPropertiesBlock(false)} className="icon" style={{ marginLeft: '1rem' }}>
            <CrossIcon />
          </span>
        </div>
      </div>
      <ActivityTaskDefinition
        id={'activity-drawer'}
        editDefinitionProp={editDefinitionProp}
        activityOperation={activityOperation}
        activityDefinitionData={activityDefinitionData}
        readOnly={readOnly}
      />
    </div>
  );
}

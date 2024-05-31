import React, { useState, useEffect } from 'react';
import Designer from '@b2bi/flow-designer';
import { Button, Column, Grid } from '@carbon/react';
import './activity-definition.css';
import { CloneIcon, CopyIcon, DeleteIcon, HistoryIcon, PlayIcon } from '../../icons';
import useActivitykStore from '../../store';
import { ROUTES } from '../../constants';

export default function ActivityDefinition() {
  const activityStore = useActivitykStore((state) => state.activities);
  const editDefinitionProp = useActivitykStore((state) => state.editDefinitionProps);
  const editSchemaProp = useActivitykStore((state) => state.editSchemaProps);
  const [showActivityDefineDrawer, setShowActivityDefineDrawer] = useState();
  const [activityDefinitionName, setActivityDefinitionName] = useState();

  useEffect(() => {
    if (activityDefinitionName === '' || activityDefinitionName === null || activityDefinitionName === undefined) {
      setShowActivityDefineDrawer(true);
    } else {
      setShowActivityDefineDrawer(false);
    }
  }, [activityDefinitionName]);

  useEffect(() => {
    setActivityDefinitionName(activityStore.definition?.name);
  }, [activityStore]);
  return (
    <>
      <Grid className="activity-actions">
        <Column>
          <CloneIcon />
        </Column>
        <Column>
          <PlayIcon />
        </Column>
        <Column>
          <DeleteIcon />
        </Column>
        <Column>
          <CopyIcon />
        </Column>
        <Column>
          <HistoryIcon />
        </Column>
        <Column className='activity-save'>
          <Button className='activity' href={ROUTES.ACTIVITY_LIST}>Save Activity</Button>
        </Column>
      </Grid>
      <Designer.WorkFlowDesigner showActivityDefineDrawer={showActivityDefineDrawer} editDefinitionProp={editDefinitionProp} editSchemaProp={editSchemaProp} />
    </>
  );
}

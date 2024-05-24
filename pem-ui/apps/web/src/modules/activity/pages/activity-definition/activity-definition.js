import React, { useState, useEffect } from 'react';
import Designer from '@b2bi/flow-designer';
import { Button, Column, Grid } from '@carbon/react';
import './activity-definition.css';
import { CLoneIcon, CopyIcon, DeleteIcon, HistoryIcon, PlayIcon } from '../../icons';
import useActivitykStore from '../../store';

export default function ActivityDefinition() {
  const activityStore = useActivitykStore((state) => state.activities);
  const [showActivityDefineDrawer, setShowActivityDefineDrawer] = useState();
  const [activityDefinitionData, setActivityDefinitionData] = useState();

  useEffect(() => {
    if (activityDefinitionData?.name === '' || activityDefinitionData?.name === null || activityDefinitionData?.name === undefined) {
      setShowActivityDefineDrawer(true);
    } else {
      setShowActivityDefineDrawer(false);
    }
  }, [activityDefinitionData]);

  useEffect(() => {
    setActivityDefinitionData(activityStore.definition);
  }, [activityStore]);
  return (
    <>
      <Grid className="activity-actions">
        <Column>
          <CLoneIcon />
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
        <Column>
          <Button>Save Activity</Button>
        </Column>
      </Grid>
      <Designer.WorkFlowDesigner showActivityDefineDrawer={showActivityDefineDrawer} />
    </>
  );
}

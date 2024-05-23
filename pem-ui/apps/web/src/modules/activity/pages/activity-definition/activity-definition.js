import React, { useState } from 'react';
import Designer from '@b2bi/flow-designer';
import { Button, Column, Grid } from '@carbon/react';
import './activity-definition.css';

export default function ActivityDefinition() {
  const [showActivityDefineDrawer, setShowActivityDefineDrawer] = useState(true);

  return (
    <>
      <Grid className="activity-actions">
        <Column>
          <Button>Save Activity</Button>
        </Column>
      </Grid>
      <Designer.WorkFlowDesigner showActivityDefineDrawer={showActivityDefineDrawer} />
    </>
  );
}

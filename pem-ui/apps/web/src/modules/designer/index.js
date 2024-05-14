import React from 'react';
import Shell from '@b2bi/shell';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Activity = {
  ActivityDefinition: React.lazy(() => import('./pages/activities'))
};

const routes = [
  {
    path: '/activities/definitions',
    breadcrumb: 'mod-activity-definition:breadcrumb.definitions',
    resourceKey: 'DEFINITIONS.VIEW',
    element: (
      <Shell.RoutePage resourceKey="DEFINITIONS.VIEW" dataLoaderConfig={{}}>
        <DndProvider backend={HTML5Backend}>
          <Activity.ActivityDefinition />
        </DndProvider>
      </Shell.RoutePage>
    )
  }
];

export { routes };

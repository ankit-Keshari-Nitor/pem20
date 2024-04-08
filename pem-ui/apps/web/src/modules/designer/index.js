import React from 'react';
import Shell from '@b2bi/shell';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Designer = {
  Designer: React.lazy(() => import('./pages/designer'))
};

const WorkFlow = {
  WorkFlow: React.lazy(() => import('./pages/workflow'))
};

const routes = [
  {
    path: '/designer/page',
    breadcrumb: 'mod-designer:breadcrumb.page-designer',
    resourceKey: 'DESIGNER.PAGE.VIEW',
    element: (
      <Shell.RoutePage resourceKey="PARTNERS.VIEW" dataLoaderConfig={{}}>
        <DndProvider backend={HTML5Backend}>
          <Designer.Designer />
        </DndProvider>
      </Shell.RoutePage>
    )
  },
  {
    path: '/activities/workflow',
    breadcrumb: 'mod-designer:breadcrumb.activity-workflow',
    resourceKey: 'WORKFLOW.VIEW',
    element: (
      <Shell.RoutePage resourceKey="WORKFLOW.VIEW" dataLoaderConfig={{}}>
        <DndProvider backend={HTML5Backend}>
          <WorkFlow.WorkFlow />
        </DndProvider>
      </Shell.RoutePage>
    )
  }
];

export { routes };
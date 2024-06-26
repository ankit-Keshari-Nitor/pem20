import React from 'react';
import Shell from '@b2bi/shell';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ActivityDefinition = {
  List: React.lazy(() => import('./pages/activity-list')),
  New: React.lazy(() => import('./pages/activity-definition')),
  Edit: React.lazy(() => import('./pages/activity-definition'))
};

const routes = [
  {
    path: '/activities',
    breadcrumb: 'mod-activity-definition:breadcrumb.definitions',
    resourceKey: 'DEFINITIONS.VIEW',
    element: (
      <Shell.RoutePage resourceKey="DEFINITIONS.VIEW" dataLoaderConfig={{}}>
        <DndProvider backend={HTML5Backend}>
          <ActivityDefinition.List />
        </DndProvider>
      </Shell.RoutePage>
    ),
    children: [
      {
        path: '/new',
        breadcrumb: 'mod-activity-definition:breadcrumb.workflow',
        resourceKey: 'DESIGNER.VIEW',
        element: (
          <Shell.RoutePage resourceKey="DESIGNER.VIEW" dataLoaderConfig={{}}>
            <DndProvider backend={HTML5Backend}>
              <ActivityDefinition.New />
            </DndProvider>
          </Shell.RoutePage>
        )
      },
      {
        path: '/:id',
        breadcrumb: 'mod-activity-definition:breadcrumb.workflow',
        resourceKey: 'DESIGNER.VIEW',
        element: (
          <Shell.RoutePage resourceKey="DESIGNER.VIEW" dataLoaderConfig={{}}>
            <DndProvider backend={HTML5Backend}>
              <ActivityDefinition.Edit />
            </DndProvider>
          </Shell.RoutePage>
        )
      }
    ]
  }
];

export { routes };

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ActivityDefinition from '../activity-definition';
import WorkFlowDesigner from '../workflow-designer';

export default function ActivityDashboard() {
  // State Management implementation will be here
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pem" element={<ActivityDefinition />} />
        <Route index element={<ActivityDefinition />} />
        <Route path="new" element={<WorkFlowDesigner />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { DownToBottom, UpToTop, Copy, Locked, Unlocked } from '@carbon/icons-react';
import { getCompatContextProvider } from 'react-querybuilder';
import CarbonValueEditor from './carbon-value-editor';
import carbonValueSelector from './carbon-value-selector';
import CarbonActionElement from './carbon-action-element';
import CarbonOperatorSelector from './carbon-operator-selector';
import CarbonRemoveRuleAction from './carbon-remove-rule-action';
//import CarbonDragHandle from './carbon-drag-handle';

export const carbonControlElements = {
  actionElement: CarbonActionElement,
  removeRuleAction: CarbonRemoveRuleAction,
  removeGroupAction: CarbonRemoveRuleAction,
  //dragHandle: CarbonDragHandle,
  valueSelector: carbonValueSelector,
  operatorSelector: CarbonOperatorSelector,
  valueEditor: CarbonValueEditor
};

export const carbonTranslations = {
  // removeGroup: { label: <Close /> },
  // removeRule: { label: <Close /> },
  cloneRuleGroup: { label: <Copy /> },
  cloneRule: { label: <Copy /> },
  lockGroup: { label: <Unlocked /> },
  lockRule: { label: <Unlocked /> },
  lockGroupDisabled: { label: <Locked /> },
  lockRuleDisabled: { label: <Locked /> },
  shiftActionDown: { label: <DownToBottom /> },
  shiftActionUp: { label: <UpToTop /> }
};

const CarbonWrapper = getCompatContextProvider({
  key: 'carbon',
  controlElements: carbonControlElements,
  translations: carbonTranslations
});

export default CarbonWrapper;

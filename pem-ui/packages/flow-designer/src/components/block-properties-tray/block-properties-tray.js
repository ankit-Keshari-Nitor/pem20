import React from 'react';
import './block-properties-tray.scss';
import { NODE_TYPE } from '../../constants';
import {
  ApiTaskDefinitionForm,
  ApprovalTaskDefinitionForm,
  GatewayTaskDefinitionForm,
  SponsorTaskDefinitionForm} from '../block-definition-forms';
import { CrossIcon } from './../../icons';

export default function BlockPropertiesTray({ selectedNode, setOpenPropertiesBlock }) {
  const getForm = (selectedNode) => {
    switch (selectedNode && selectedNode.type) {
      case NODE_TYPE.APPROVAL:
        return <ApprovalTaskDefinitionForm selectedNode={selectedNode} />;
      case NODE_TYPE.SPONSOR:
        return <SponsorTaskDefinitionForm selectedNode={selectedNode} />;
      case NODE_TYPE.GATEWAY:
        return <GatewayTaskDefinitionForm selectedNode={selectedNode} />;
      case NODE_TYPE.API:
        return <ApiTaskDefinitionForm selectedNode={selectedNode} />;
      default:
        return null;
    }
  };

  return (
    <div className="block-properties-container">
      <div className="title-bar">
        <span className="title">
          {selectedNode?.data?.editableProps.name} ({selectedNode?.data?.taskName})
        </span>
        <span onClick={() => setOpenPropertiesBlock(false)} style={{ cursor: 'pointer' }}>
          <CrossIcon />
        </span>
      </div>
      {getForm(selectedNode)}
    </div>
  );
}

const Nodes_With_SubProcess = ['SYSTEM', 'CUSTOM', 'SPONSOR_TASK', 'PARTNER_TASK'];

export const getNodeSpecificDataObj = (node) => {
  switch (node.type.toUpperCase()) {
    case 'API':
      return {
        api: {
          apiConfiguration: 'apiConfiguration',
          url: 'https://jira.com/browse/PEM-273476',
          method: 'GET',
          requestContentType: 'JSON',
          responseContentType: 'JSON',
          file: 'file object',
          headers: '[{"key:"value"}]',
          requestBody: '{"name:"test_name"}',
          sampleResponse: '{"name:"test_name"}',
          responseBody: '{"name:"test_name"}'
        }
      };
    case 'XSLT':
    case 'PARTNER_TASK':
    case 'APPROVAL_TASK':
    case 'ATTRIBUTE_TASK':
    case 'SPONSOR_TASK':
    case 'CUSTOM':
    case 'SYSTEM':
    case 'GATEWAY':
    case 'FORM':
      return {
        xslt: {
          key: 'value'
        }
      };
  }
};

//source node id
const getExitConditions = (nodeId, originalNodes) => {
  const node = originalNodes.find((x) => x.id === nodeId);
  return {
    condition: node.data.validateExitValidationQuery,
    errorMessage: node.data.exitValidationMessage
  };
};
const getEntryConditions = (nodeId, originalNodes) => {
  const node = originalNodes.find((x) => x.id === nodeId);
  return {
    condition: node.data.validateEntryValidationQuery,
    errorMessage: node.data.entryValidationMessage
  };
};

export const generateNodeEdgesForApi = (nodes, edges) => {
  let allConnectors = [];
  const nodesData = nodes.map((node, index) => {
    //x can have dialogNodes and dialogEdges

    const nodeObj = {
      id: node.id ? node.id : `${node.type}-${index}`,
      name: node.data.taskName,
      type: node.type,
      diagram: {
        x: node.position.x,
        y: node.position.y
      },
      nodes: []
    };

    const nodeSpecificData = getNodeSpecificDataObj(node);

    if (Nodes_With_SubProcess.includes(node.type.toUpperCase())) {
      if (node.data.dialogNodes) {
        const subProcessData = generateNodeEdgesForApi(node.data.dialogNodes, node.data.dialogEdges);
        nodeObj.nodes = subProcessData.nodes;
        subProcessData.edges.forEach((e) => allConnectors.push({ ...e, data: { parent: node.id } }));
      }
    }
    return { ...nodeObj, data: nodeSpecificData };
  });

  const edgesData = edges.map((x) => {
    const entryCondition = getEntryConditions(x.target, nodes);
    const exitCondition = getExitConditions(x.source, nodes);

    return {
      id: x.id,
      source: x.source,
      target: x.target,
      exitCondition, //to pass both conditions separatly
      entryCondition,
      diagram: []
    };
  });
  allConnectors = [...edgesData];
  return {
    edges: allConnectors,
    nodes: nodesData
  };
};

import { API_END_POINTS } from './../constants';
import { RestApiService } from '../../../common/api-handler/rest-api-service';

export const getActivityList = async (pageNo, pageSize, sortDir = 'ASC', searchKey = '', status = '', sortBy = 'modifyts') => {
  try {
    let url = `${API_END_POINTS.ACTIVITY_DEFINITION}?application=PEM&sortDir=${sortDir}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`;

    if (searchKey !== '') {
      url += `&name=con:${searchKey}`;
    }
    if (status !== '') {
      url += `&status=${status}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { content: [], pageContent: {} };
    }
    const jsonData = await response.json();

    const customizedData =
      jsonData.content !== null &&
      jsonData.content.map((e) => ({
        id: e.activityDefnKey,
        activityDefnVersionKey: e.defaultVersion.activityDefnVersionKey,
        version: e.defaultVersion.version,
        isEncrypted: e.defaultVersion.isEncrypted,
        status: e.defaultVersion.status,
        ...e
      }));

    return {
      content: customizedData || [],
      pageContent: jsonData.pageContent || []
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

export const deleteActivity = async (activityDefnKey) => {
  try {
    let url = `${API_END_POINTS.ACTIVITY_DEFINITION}/${activityDefnKey}`;
    const response = await fetch(url, {
      method: 'DELETE'
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return {
        success: false
      };
    }
    return {
      success: true,
      data: response.json()
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      success: false
    };
  }
};

export const markActivityDefinitionAsFinal = async (activityDefnKey, activityDefnKeyVersion) => {
  try {
    let url = `${API_END_POINTS.ACTIVITY_DEFINITION}/${activityDefnKey}/versions/${activityDefnKeyVersion}/actions/markAsFinal`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: ''
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return 'Internal Error';
    }
    const responseBody = await response.text();
    try {
      const responseStatus = JSON.parse(responseBody);
      return responseStatus.status;
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return 'Internal Error';
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return 'Internal Error';
  }
};

export const getActivityDetails = async (activityKey, activityVersoinKey) => {
  const url = `${API_END_POINTS.ACTIVITY_DEFINITION}/${activityKey}`;
  const activitydata = await new RestApiService().call({ url }, null);
  if (activitydata.success) {
    const activityVersions = await new RestApiService().call({ url: `${url}versions?&pageNo=0&pageSize=100` }, null);
    const activityCurrentVersionDetails = await new RestApiService().call({ url: `${url}versions/${activityVersoinKey}` }, null);
    const activityCurrentVersionData = await new RestApiService().call({ url: `${url}versions/${activityVersoinKey}/actions/getData` }, null);
    return {
      success: true,
      definition: {
        name: activitydata.data.name,
        description: activitydata.data.description,
        definationKey: activitydata.data.key
      },
      versions: activityVersions.data.content,
      version: {
        key: activityCurrentVersionDetails.data.key,
        encrypted: activityCurrentVersionDetails.data.isEncrypted, //false,
        contextData: activityCurrentVersionDetails.data.contextData,
        status: activityCurrentVersionDetails.data.status,
        number: activityCurrentVersionDetails.data.version
      },
      schema: {
        nodes: activityCurrentVersionData.data.nodes,
        edges: activityCurrentVersionData.data.edges
      }
    };
  } else {
    return {
      success: false,
      data: null
    };
  }
};

export const saveActivityData = async (activityData) => {
  const url = `${API_END_POINTS.ACTIVITY_DEFINITION}`;
  const file = new Blob([JSON.stringify(activityData)], { type: 'text/json' });
  const config = {
    url,
    data: {
      name: activityData.name,
      description: activityData.description,
      application: 'PEM',
      file: file
    }
  };
  return await new RestApiService().callWithFile(config, null);
};

/* ----------------------------- Get the version data of activity -------------------------------------------- */
export const getActivityVersionData = async (activityDefnKey, activityDefnVersionKey) => {
  try {
    const url = `${API_END_POINTS.ACTIVITY_DEFINITION}/${activityDefnKey}/versions/${activityDefnVersionKey}`;
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return undefined;
    }
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
/* ----------------------------- Get the version list of activity -------------------------------------------- */
export const getActivityVersionList = async (activityDefnKey) => {
  try {
    const url = `${API_END_POINTS.ACTIVITY_DEFINITION}/${activityDefnKey}/versions`;
    const response = await fetch(url, {
      method: 'GET'
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return undefined;
    }
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
export const getActivityVersionkey = async (pageNo, pageSize, sortDir = 'ASC', status = '', isDefault = '', activityDefnKey) => {
  try {
    let url = `${API_END_POINTS.ACTIVITY_DEFINITION}/
    ${activityDefnKey}/versions?isDefault=${isDefault}
    &sortDir=${sortDir}&pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { content: [], page: {} };
    }

    const responseBody = await response.text();
    try {
      const jsonData = JSON.parse(responseBody);
      const customizedData =
        jsonData.content !== null &&
        jsonData.content.map((e) => ({
          id: e.activityDefnVersionKey,
          ...e
        }));
      return {
        content: customizedData || [],
        pageContent: jsonData.page || []
      };
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

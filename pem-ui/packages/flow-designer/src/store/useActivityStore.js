import { create } from 'zustand';
import { TASK_INITIAL_NODES } from '../constants';

const activityStore = (set, get) => ({
  activities: {
    taskNodes: TASK_INITIAL_NODES,
    taskEdges: []
  },
  addTaskNodes: (activity) => {
    set((state) => ({
      activities: { taskNodes: state.activities.taskNodes.concat(activity), taskEdges: state.activities.taskEdges }
    }));
  },
  editNodePros: (activity, props, value) => {
    set((state) => {
      const copyNodes = state.activities.taskNodes;
      copyNodes.map((copyNode) => {
        if (activity.id === copyNode.id) {
          copyNode.data[props] = value;
        }
        return copyNode;
      });
      return { activities: { taskNodes: copyNodes, taskEdges: state.activities.taskEdges } };
    });
  },
  addDilogNodes: (taskNode, dilogNode) => {
    set((state) => {
      const TaskNodeData = state.activities.taskNodes.map((node) => {
        if (node.id === taskNode.id) {
          return node.data.dialogNodes.concat(dilogNode);
        } else {
          return node;
        }
      });
      return { activities: { taskNodes: TaskNodeData, taskEdges: state.activities.taskEdges } };
    });
  },
  issueActivity: (id) => {
    const activities = get().activities;
    const updatedActivities = activities?.map((activity) => {
      if (activity.id === id) {
        return {
          ...activity,
          status: 'issued'
        };
      } else {
        return activity;
      }
    });
    set((state) => ({
      activities: updatedActivities
    }));
  },
  returnActivity: (id) => {
    const activities = get().activities;
    const updatedActivities = activities?.map((activity) => {
      if (activity.id === id) {
        return {
          ...activity,
          status: 'available'
        };
      } else {
        return activity;
      }
    });
    set((state) => ({
      activities: updatedActivities
    }));
  },
  reset: () => {
    set({
      activities: []
    });
  }
});

const useActivityStore = create(activityStore);

export default useActivityStore;

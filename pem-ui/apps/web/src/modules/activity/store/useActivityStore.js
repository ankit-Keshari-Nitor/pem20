import { create } from 'zustand';
import { ACTIVITY_DEFINITION_DATA } from '../constants';

const activityStore = (set, get) => ({
  activities: {
    definition: ACTIVITY_DEFINITION_DATA,
    schema: {}
  },
  // Activity Flow State
  editDefinitionProps: (value) => {
    set((state) => {
      const copyData = state.activities.definition;
      Object.keys(copyData).map((key) => {
        if (value[key]) {
          copyData[key] = value[key];
        }
        return copyData;
      });
      return { activities: { definition: copyData, schema: state.activities.schema } };
    });
  },
  editSchemaProps: (task) => {
    set((state) => {
      console.log('updating>>>', { activities: { definition: state.activities.definition, schema: { task } } });
      return { activities: { definition: state.activities.definition, schema: { ...task } } };
    });
  },
  reset: () => {
    set({
      activities: {
        definition: ACTIVITY_DEFINITION_DATA,
        schema: []
      }
    });
  }
});

const useActivitykStore = create(activityStore);

export default useActivitykStore;

import { create } from 'zustand';

const activityStore = (set, get) => ({
  activities: {
    definition: {},
    schema: []
  },
  // Activity Flow State
  editDefinitionProps: (value) => {
    set((state) => {
      return { activities: { definition: value, schema: state.activities.schema } };
    });
  },
  reset: () => {
    set({
      activities: {
        definition: {},
        schema: []
      }
    });
  }
});

const useActivitykStore = create(activityStore);

export default useActivitykStore;

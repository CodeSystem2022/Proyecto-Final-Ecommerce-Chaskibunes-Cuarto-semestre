import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeFilter: 'all',
  },
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setActiveFilter } = filterSlice.actions;
export const selectActiveFilter = (state) => state.filter.activeFilter;

export default filterSlice.reducer;

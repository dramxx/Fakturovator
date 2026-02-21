import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    clearContent: state => {
      state.content = '';
    },
  },
});

export const { setContent, clearContent } = demoSlice.actions;
export default demoSlice.reducer;

/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../utils/ajax';

function getData() {
  return new Promise((resolve) => {
    get('data/data.json').then((e) => {
      resolve(JSON.parse(e));
    });
  });
}

// Create Thunk
export const fetchData = createAsyncThunk('fetchData', async (thunkAPI) => {
  const d = await getData();
  return d;
});

// Slice
const data = createSlice({
  name: 'data',
  initialState: {
    data: [],
    error: null,
    request: false,
  },
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.request = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.request = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state) => {
      state.request = false;
    },
  },
});

export default data.reducer;

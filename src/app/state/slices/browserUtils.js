/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import isMobile from 'ismobilejs';
import debounce from 'lodash.debounce';
import { createSlice } from '@reduxjs/toolkit';

const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const portraitView = window.matchMedia('(orientation: portrait)');
const landscapeView = window.matchMedia('(orientation: landscape)');

const init = {
  width: 0,
  hight: 0,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  orientation: '',
  isPhone: isMobile.phone,
};

// Slice
const browserUtils = createSlice({
  name: 'browserUtils',
  initialState: init,
  reducers: {
    onResize: (state, action) => {
      if (state.width === action.payload.width) {
        return;
      }
      state.width = action.payload.width;
    },
    onDarkMode: (state, action) => {
      state.darkMode = action.payload.bool;
    },
    onOrientationChange: (state, action) => {
      state.orientation = action.payload.orientation;
    },
  },
});

export default browserUtils.reducer;

// set up listeners
const { onResize, onDarkMode, onOrientationChange } = browserUtils.actions;

export function setUpBrowserListeners() {
  window.addEventListener(
    'resize',
    debounce(() => {
      onResize({ width: window.innerWidth, height: window.innerHeight });
    }, 200),
  );

  // listen for dark mode switch
  if (colorSchemeQuery) {
    colorSchemeQuery.addEventListener('change', (e) => {
      onDarkMode({ bool: e.matches });
    });
  }

  // orienttation changes
  if (portraitView) {
    portraitView.addEventListener('change', (e) => {
      if (e.matches) {
        onOrientationChange({ orientation: 'portrait' });
      }
    });
  }

  if (landscapeView) {
    landscapeView.addEventListener('change', (e) => {
      if (e.matches) {
        onOrientationChange('landscape');
      }
    });
  }

  // send out initial values
  onResize({ width: window.innerWidth, height: window.innerHeight });

  if (portraitView && portraitView.matches) {
    onOrientationChange('portrait');
  }

  if (landscapeView && landscapeView.matches) {
    onOrientationChange('landscape');
  }
}

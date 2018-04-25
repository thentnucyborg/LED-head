import * as types from '../constants/ActionTypes';

const g = [...new Array(6*3)].map((x, i) => [...new Array(6*3)].map((y, j) => 'rgba(60, 0, 240, 0.8)'));

const defaultState = {
  isRunning: false,
  showIndex: 0,
  grid: g,
  error: '',
  mode: 'LEDCUBE',
};

const index = (state = defaultState, action) => {
  const { type, payload } = action;
  const handler = {
    [types.START_SHOW]: startShow,
    [types.STOP_SHOW]: stopShow,
    [types.SET_SHOW]: setShow,
    [types.SET_GRID]: setGrid,
    [types.ON_UPDATE_GRID]: onUpdateGrid,
    [types.ON_ERROR]: onError,
  };
  return handler[type] ? handler[type](state, payload) : state;
};

const startShow = (state) => ({
  ...state,
  isRunning: true,
});

const stopShow = (state) => ({
  ...state,
  isRunning: false,
});

const setShow = (state, { showIndex }) => ({
  ...state,
  showIndex: showIndex,
});

const setGrid = (state, { grid }) => ({
  ...state,
  grid: grid,
});

const onUpdateGrid = (state) => ({
  ...state,
});

const onError = (state, error) => ({
  ...state,
  error: error,
});

export default index;

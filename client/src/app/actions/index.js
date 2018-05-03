import * as types from '../constants/ActionTypes';
import api from '../api/api';

const actionCreator = (type) => (payload) => ({
  type: type,
  payload,
});

/*
const handler = (promise) => async () => {
  promise
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
}

const handler = (dispatch) => (promise) => (type) => {
  promise
    .then((result) => dispatch(actionCreator(type)(result)))
    .catch((error) => dispatch(actionCreator(types.ON_ERROR)(error)));
};
*/

export const setGrid = (payload) => actionCreator(types.SET_GRID)(payload);

export const startShow = () => (dispatch) => {
  api.startShow().then((res) => {
    dispatch(actionCreator(types.START_SHOW)());
  }).catch((error) => {
    dispatch(actionCreator(types.ON_ERROR)(error));
  });
};

export const stopShow = () => (dispatch) => {
  api.stopShow().then((res) => {
    dispatch(actionCreator(types.STOP_SHOW)());
  }).catch((error) => {
    dispatch(actionCreator(types.ON_ERROR)(error));
  });
};

export const setShow = (index) => (dispatch) => {
  api.setShow(index).then((res) => {
    dispatch(actionCreator(types.SET_SHOW)({ showIndex: index }));
  }).catch((error) => {
    dispatch(actionCreator(types.ON_ERROR)(error));
  });
};

export const setMode = (mode) => (dispatch) => {
  api.setMode(mode).then((res) => {
    dispatch(actionCreator(types.SET_MODE)({ mode: mode }));
  }).catch((error) => {
    dispatch(actionCreator(types.ON_ERROR)(error));
  });
};

export const onOpen = (payload) => (dispatch) => {

};

export const onMessage = (payload) => (dispatch) => {
  dispatch(setGrid({ grid: payload }));
};

export const onClose = (payload) => (dispatch) => {

};

export const onError = (payload) => (dispatch) => {
  dispatch(actionCreator(types.ON_ERROR)(payload));
};

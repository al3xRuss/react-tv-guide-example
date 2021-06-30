import {
  CREATE_SHOW,
  RETRIEVE_SHOWS,
  UPDATE_SHOW
} from "./types.constants";

import ShowDataService from "../services/show.service";

export const createShow = (title, description) => async (dispatch) => {
  try {
    const res = await ShowDataService.create({ title, description });

    dispatch({
      type: CREATE_SHOW,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveShows = () => async (dispatch) => {
  try {
    const res = await ShowDataService.getAll();
    dispatch({
      type: RETRIEVE_SHOWS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateShow = (id, data) => async (dispatch) => {
  try {
    const res = await ShowDataService.update(id, data);

    dispatch({
      type: UPDATE_SHOW,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findShowsByTitle = (title) => async (dispatch) => {
  try {
    const res = await ShowDataService.findByTitle(title);
    dispatch({
      type: RETRIEVE_SHOWS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
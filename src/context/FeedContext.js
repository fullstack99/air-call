import { createContext } from "react";
import axios from "axios";

import {
  SET_CALL_LIST,
  SET_CALL_DETAIL,
  UPDATE_CALL_DETAIL,
  RESET_CALL_LIST,
  SET_LOADING,
  SET_ERROR,
} from "./types";
import CreateDataContext from "./CreateDataContext";

export const ContactContext = createContext();
const BASE_API =
  "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app";

const initialState = {
  calls: [],
  call: null,
  loading: false,
  message: null,
};

const setLoading = (dispatch, loading) => {
  dispatch({
    type: SET_LOADING,
    payload: { loading },
  });
};

const getAllCallList = (dispatch) => async () => {
  const path = `${BASE_API}/activities`;
  try {
    setLoading(dispatch, true);
    const { data } = await axios.get(path);
    dispatch({
      type: SET_CALL_LIST,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  }
};

const getCallById = (dispatch) => async (id) => {
  const path = `${BASE_API}/activities/${id}`;
  try {
    setLoading(dispatch, true);
    const { data } = await axios.get(path);
    dispatch({
      type: SET_CALL_DETAIL,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  }
};

const updateCall =
  (dispatch) =>
  async ({ id, body }) => {
    const path = `${BASE_API}/activities/${id}`;
    try {
      setLoading(dispatch, true);
      await axios.patch(path, body);
      dispatch({
        type: UPDATE_CALL_DETAIL,
        payload: { id, body },
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };

const resetAllCalls = (dispatch) => async () => {
  const path = `${BASE_API}/reset`;
  try {
    setLoading(dispatch, true);
    await axios.patch(path);
    dispatch({
      type: RESET_CALL_LIST,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      const { loading } = action.payload;
      return {
        ...state,
        message: null,
        loading,
      };
    case SET_CALL_LIST:
      return {
        ...state,
        calls: action.payload,
        loading: false,
      };
    case RESET_CALL_LIST: {
      return {
        ...state,
        calls: state.calls.map((v) => ({ ...v, is_archived: false })),
        loading: false,
      };
    }
    case SET_CALL_DETAIL:
      return {
        ...state,
        call: action.payload,
        loading: false,
      };
    case UPDATE_CALL_DETAIL:
      return {
        ...state,
        call: { ...state.call, ...action.payload.body },
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const dispatch = (dispatch) => async (action) => dispatch(action);

export const { Provider, Context } = CreateDataContext(
  reducer,
  {
    getAllCallList,
    resetAllCalls,
    updateCall,
    getCallById,
    dispatch,
  },
  initialState
);

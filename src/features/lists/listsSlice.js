import { createSelector } from "reselect";
import axios from "axios";
import {
  LIST_TITLE_EDITED,
  LIST_ADDED,
  LIST_REMOVED,
  LISTS_LOADING,
  LISTS_LOADED,
  LOADING_FAILED,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from "./actionTypes";
import { IDLE, PROCESSING, FAILED, SUCCEEDED } from "../status/statusConstants";
import {
  getCurrentListId,
  fetchList,
  currentListTitleEdited,
  listLoaded,
} from "../currentList/currentListSlice";

const initialState = {
  loadingStatus: IDLE,
  requestStatus: IDLE,
  lists: {},
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADDED: {
      const { id, date, title } = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [id]: { id, date, title },
        },
      };
    }

    case LIST_REMOVED: {
      const removedId = action.payload;
      const newLists = { ...state.lists };
      delete newLists[removedId];
      return {
        ...state,
        lists: newLists,
      };
    }

    case LIST_TITLE_EDITED: {
      const { id, title } = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [id]: { ...state.lists[id], title: title },
        },
      };
    }

    case LISTS_LOADING: {
      return {
        ...state,
        loadingStatus: PROCESSING,
      };
    }

    case LISTS_LOADED: {
      const newLists = {};
      action.payload.forEach((list) => {
        newLists[list.id] = { id: list.id, title: list.title, date: list.date };
      });
      return {
        ...state,
        lists: newLists,
        loadingStatus: SUCCEEDED,
      };
    }

    case LOADING_FAILED: {
      return {
        ...state,
        loadingStatus: FAILED,
        lists: {},
      };
    }

    case REQUEST_FAILED: {
      return {
        ...state,
        requestStatus: FAILED,
        lists: {},
      };
    }

    case REQUEST_SUCCEEDED: {
      return {
        ...state,
        requestStatus: IDLE,
      };
    }
    default:
      return state;
  }
};

export default listsReducer;

//action creators

export const listTitleEdited = (id, title) => ({
  type: LIST_TITLE_EDITED,
  payload: { id, title },
});
export const listAdded = (listObject) => ({
  type: LIST_ADDED,
  payload: listObject,
});
export const listRemoved = (listId) => ({
  type: LIST_REMOVED,
  payload: listId,
});

export const listsLoading = () => ({ type: LISTS_LOADING });
export const listsLoaded = (lists) => ({ type: LISTS_LOADED, payload: lists });
export const loadingFailed = () => ({ type: LOADING_FAILED });
export const requestFailed = () => ({ type: REQUEST_FAILED });
export const requestSucceeded = () => ({ type: REQUEST_SUCCEEDED });

export const fetchLists = () => async (dispatch) => {
  dispatch(listsLoading());
  try {
    const response = await axios.get("http://localhost:4200/lists");
    dispatch(listsLoaded(response.data));
    return response.data;
  } catch {
    dispatch(loadingFailed());
    setTimeout(() => dispatch(fetchLists()), 5000);
  }
};

export const addNewList = (listObject) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4200/lists",
      listObject
    );
    dispatch(listAdded(response.data));
    return response.data.id;
  } catch {
    dispatch(requestFailed());
  }
};

export const removeList = (listId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4200/lists/${listId}`);
    dispatch(listRemoved(listId));
  } catch {
    dispatch(requestFailed());
  }
};

export const editListTitle = (id, change) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:4200/lists/${id}`, change);
    dispatch(listTitleEdited(id, change.title));
    dispatch(currentListTitleEdited(change.title));
  } catch {
    dispatch(requestFailed());
  }
};

// selectors, like: get some specific data from state, like only ids, or array instead of object with keys, often useing createSelector
// export const selectCurrentListId = (state) => state.lists.currentList.id;

export const getLists = (state) => state.lists;
export const getLoadingStatus = (state) => getLists(state).loadingStatus;
export const getRequestStatus = (state) => getLists(state).requestStatus;

export const getListsArray = createSelector(getLists, (lists) =>
  Object.values(lists.lists)
);

export const getListsIds = createSelector(getLists, (lists) =>
  Object.keys(lists.lists)
);

export const getLastListId = createSelector(
  getListsArray,
  getLoadingStatus,
  (listsArray, status) => {
    if (listsArray.length) {
      return listsArray[listsArray.length - 1].id;
    } else {
      return "";
    }
  }
);

export const getNoncurrentLists = createSelector(
  getListsArray,
  getCurrentListId,
  (lists, currentListId) => {
    return lists.filter((list) => {
      return list.id !== currentListId;
    });
  }
);

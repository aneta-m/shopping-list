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
import { IDLE, PROCESSING, FAILED } from "../status/statusConstants";
import {
  getCurrentListId,
  fetchList,
  currentListTitleEdited,
  listLoaded,
} from "../currentList/currentListSlice";

const initialState = {
  loadingStatus: IDLE,
  requestStatus: FAILED,
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
        loadingStatus: IDLE,
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
    const lastId = response.data[response.data.length - 1].id;
    dispatch(fetchList(lastId));
    dispatch(listsLoaded(response.data));
  } catch {
    dispatch(loadingFailed());
  }
};

export const addNewList = (listObject) => async (dispatch) => {
  const response = await axios.post("http://localhost:4200/lists", listObject);
  if (response.status === 200) {
    dispatch(listAdded(response.data));
    dispatch(listLoaded(response.data));
  } else {
    console.error(response.status, response.message);
    dispatch(requestFailed());
  }
};

export const removeList = (listId) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:4200/lists/${listId}`);
  if (response.status === 200) {
    dispatch(fetchLists());
  } else {
    dispatch(requestFailed());
    console.log(response.status, response.message);
  }
};

export const editListTitle = (id, change) => async (dispatch) => {
  const response = await axios.put(`http://localhost:4200/lists/${id}`, change);
  if (response.status === 200) {
    dispatch(listTitleEdited(id, change.title));
    console.log(id, change);
    dispatch(currentListTitleEdited(change.title));
  } else {
    console.log(response.status, response.message);
    dispatch(requestFailed);
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

export const getNoncurrentLists = createSelector(
  getListsArray,
  getCurrentListId,
  (lists, currentListId) => {
    return lists.filter((list) => {
      return list.id !== currentListId;
    });
  }
);

import { createSelector } from "reselect";
import axios from "axios";
import {
  LIST_ITEM_ADDED,
  LIST_ITEM_REMOVED,
  LIST_ITEM_EDITED,
  LIST_TITLE_EDITED,
  LIST_LOADING,
  LIST_LOADED,
  LOADING_FAILED,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from "./actionTypes";
import { IDLE, PROCESSING, FAILED } from "../status/statusConstants";
import { selectFilters } from "../labels/labelsSlice";

const initialState = {
  loadingStatus: IDLE,
  requestStatus: IDLE,
  currentList: {},
};

const currentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ITEM_ADDED: {
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list: [...state.currentList.list, action.payload],
        },
      };
    }
    case LIST_ITEM_REMOVED: {
      const itemId = action.payload;
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list: [...state.currentList.list].filter(
            (item) => item.id !== itemId
          ),
        },
      };
    }

    case LIST_ITEM_EDITED: {
      const { id, change } = action.payload;
      console.log(change);
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list: [...state.currentList.list].map((listItem) => {
            if (listItem.id === id) {
              const newListItem = { ...listItem, ...change };
              console.log(newListItem);
              return { ...listItem, ...change };
            }
            return listItem;
          }),
        },
      };
    }

    case LIST_TITLE_EDITED: {
      return {
        ...state,
        currentList: { ...state.currentList, title: action.payload },
      };
    }

    case LIST_LOADING: {
      return {
        ...state,
        loadingStatus: PROCESSING,
      };
    }
    case LIST_LOADED: {
      return {
        ...state,
        currentList: action.payload,
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
export default currentListReducer;

export const listItemAdded = (item) => ({
  type: LIST_ITEM_ADDED,
  payload: item,
});
export const listItemRemoved = (itemId) => ({
  type: LIST_ITEM_REMOVED,
  payload: itemId,
});
export const listItemEdited = (id, change) => ({
  type: LIST_ITEM_EDITED,
  payload: { id, change },
});

export const currentListTitleEdited = (title) => ({
  type: LIST_TITLE_EDITED,
  payload: title,
});
export const listLoading = () => ({ type: LIST_LOADING });
export const listLoaded = (list) => ({ type: LIST_LOADED, payload: list });
export const loadingFailed = () => ({ type: LOADING_FAILED });
export const requestFailed = () => ({ type: REQUEST_FAILED });
export const requestSucceeded = () => ({ type: REQUEST_SUCCEEDED });

// middleware functions (thunk - fetch data, post data)

export const fetchList = (id) => async (dispatch) => {
  dispatch(listLoading());
  try {
    const response = await axios.get(`http://localhost:4200/lists/${id}`);
    setTimeout(() => dispatch(listLoaded(response.data)), 500);
  } catch {
    dispatch(loadingFailed());
    setTimeout(() => {
      dispatch(fetchList(id));
    }, 5000);
  }
};

export const addListItem = (item) => async (dispatch, getState) => {
  const listId = getCurrentListId(getState());
  try {
    const response = await axios.post(
      `http://localhost:4200/lists/${listId}`,
      item
    );
    dispatch(listItemAdded(response.data));
  } catch {
    dispatch(requestFailed());
  }
};

export const removeListItem = (itemId) => async (dispatch, getState) => {
  const listId = getCurrentListId(getState());
  try {
    await axios.delete(`http://localhost:4200/lists/${listId}/item/${itemId}`);
    dispatch(listItemRemoved(itemId));
  } catch {
    dispatch(requestFailed());
  }
};

export const editListItem = (id, change) => async (dispatch, getState) => {
  const listId = getCurrentListId(getState());
  try {
    await axios.put(`http://localhost:4200/lists/${listId}/item/${id}`, change);
    dispatch(listItemEdited(id, change));
  } catch {
    dispatch(requestFailed());
  }
};
export const getCurrentListSlice = (state) => state.currentList;
export const getCurrentList = (state) => getCurrentListSlice(state).currentList;
export const getCurrentListId = (state) => getCurrentList(state).id;
export const getRequestStatus = (state) =>
  getCurrentListSlice(state).requestStatus;
export const getLoadingStatus = (state) =>
  getCurrentListSlice(state).loadingStatus;

export const selectFilteredList = createSelector(
  getCurrentList,
  selectFilters,
  (currentList, filters) => {
    console.log(currentList, filters);

    return currentList.list && filters.length > 0
      ? currentList.list.filter((item) =>
          filters.some((filterId) => filterId === item.labelId)
        )
      : currentList.list;
  }
);

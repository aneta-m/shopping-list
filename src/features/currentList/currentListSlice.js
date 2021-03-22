import { createSelector } from "reselect";
import axios from "axios";
import {
  LIST_ITEM_ADDED,
  LIST_ITEM_REMOVED,
  LIST_ITEM_EDITED,
  LIST_TITLE_EDITED,
  LIST_LOADING,
  LIST_LOADED,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from "./actionTypes";
import { IDLE, PROCESSING, FAILED } from "../lists/statusConstants";
import { selectFilters } from "../labels/labelsSlice";

const initialState = {
  status: IDLE,
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
        status: PROCESSING,
      };
    }
    case LIST_LOADED: {
      return {
        ...state,
        currentList: action.payload,
        status: IDLE,
      };
    }

    case REQUEST_FAILED: {
      return {
        ...state,
        status: FAILED,
        lists: {},
      };
    }

    case REQUEST_SUCCEEDED: {
      return {
        ...state,
        status: IDLE,
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
export const requestFailed = () => ({ type: REQUEST_FAILED });
export const requestSucceeded = () => ({ type: REQUEST_SUCCEEDED });

// middleware functions (thunk - fetch data, post data)

export const fetchList = (id) => async (dispatch) => {
  dispatch(listLoading());
  const response = await axios.get(`http://localhost:4200/lists/${id}`);
  if (response.status === 200) {
    dispatch(listLoaded(response.data));
  } else {
    dispatch(requestFailed());
  }
};

export const addListItem = (item) => async (dispatch, getState) => {
  const listId = getState().lists.currentList.id;
  const response = await axios.post(
    `http://localhost:4200/lists/${listId}`,
    item
  );
  if (response.status === 200) {
    dispatch(listItemAdded(response.data));
  } else {
    dispatch(requestFailed);
    console.log(response.status, response.message);
  }
};

export const removeListItem = (itemId) => async (dispatch, getState) => {
  const listId = getState().lists.currentList.id;
  console.log(listId);
  const response = await axios.delete(
    `http://localhost:4200/lists/${listId}/item/${itemId}`
  );
  if (response.status === 200) {
    dispatch(listItemRemoved(itemId));
  } else {
    dispatch(requestFailed);
    console.log(response.status, response.message);
  }
};

export const editListItem = (id, changedPart) => async (dispatch, getState) => {
  const listId = getState().lists.currentList.id;
  const response = await axios.put(
    `http://localhost:4200/lists/${listId}/item/${id}`,
    changedPart
  );
  if (response.status === 200) {
    dispatch(listItemEdited(id, changedPart));
  } else {
    dispatch(requestFailed);
    console.log(response.status, response.message);
  }
};
export const getCurrentListSlice = (state) => state.currentList;
export const getCurrentList = (state) => getCurrentListSlice(state).currentList;
export const getCurrentListId = (state) => getCurrentList(state).id;
export const getStatus = (state) => getCurrentListSlice(state).status;

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

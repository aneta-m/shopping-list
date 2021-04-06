import axios from "axios";
import {
  LABEL_ADDED,
  LABEL_REMOVED,
  LABEL_EDITED,
  LABELS_LOADING,
  LABELS_LOADED,
  FILTER_ADDED,
  FILTER_REMOVED,
  FILTERS_CLEARED,
  LOADING_FAILED,
  REQUEST_FAILED,
  REQUEST_SUCCEEDED,
} from "./actionTypes";
import { IDLE, PROCESSING, FAILED, SUCCEEDED } from "../status/statusConstants";
import { createSelector } from "reselect";

const initialState = {
  requestStatus: IDLE,
  loadingStatus: IDLE,
  labels: {},
  filteredLabels: [],
};

const labelsReducer = (state = initialState, action) => {
  console.warn("ACTION:0", action);

  switch (action.type) {
    case LABEL_ADDED: {
      const newLabel = action.payload;
      return {
        ...state,
        labels: {
          ...state.labels,
          [newLabel.id]: newLabel,
        },
      };
    }
    case LABEL_REMOVED: {
      const removedId = action.payload;
      const newLabels = { ...state.labels };
      delete newLabels[removedId];
      return {
        ...state,
        labels: newLabels,
      };
    }
    case LABEL_EDITED: {
      const { id, change } = action.payload;
      return {
        ...state,
        labels: { ...state.labels, [id]: { ...state.labels[id], ...change } },
      };
    }
    case LABELS_LOADING: {
      return {
        ...state,
        loadingStatus: PROCESSING,
      };
    }
    case LABELS_LOADED: {
      const newLabels = {};
      action.payload.forEach((label) => {
        newLabels[label.id] = {
          id: label.id,
          title: label.title,
          color: label.color,
        };
      });
      return {
        ...state,
        loadingStatus: IDLE,
        labels: newLabels,
      };
    }

    case LOADING_FAILED: {
      return {
        ...state,
        loadingStatus: FAILED,
      };
    }

    case REQUEST_FAILED: {
      return {
        ...state,
        requestStatus: FAILED,
      };
    }

    case REQUEST_SUCCEEDED: {
      return {
        ...state,
        requestStatus: IDLE,
      };
    }
    case FILTER_ADDED: {
      const id = action.payload;
      return {
        ...state,
        filteredLabels: [...state.filteredLabels, id],
      };
    }
    case FILTER_REMOVED: {
      const id = action.payload;
      return {
        ...state,
        filteredLabels: [...state.filteredLabels].filter((item) => item !== id),
      };
    }

    case FILTERS_CLEARED: {
      return {
        ...state,
        filteredLabels: [],
      };
    }

    //     case LABEL_FILTERED: {
    // const id = action.payload;
    // const newFilteredLabels = [...state.filteredLabels,]
    // newfilteredLabels.forEach(id, index => {
    //   if(id === )
    // })
    // return {
    //   ...state,
    //   filteredLabels: newFilteredLabels
    // }
    // }
    default:
      return state;
  }
};

export default labelsReducer;

//action creators
export const labelAdded = (label) => ({
  type: LABEL_ADDED,
  payload: label,
});
export const labelRemoved = (id) => ({
  type: LABEL_REMOVED,
  payload: id,
});
export const labelEdited = (id, change) => ({
  type: LABEL_EDITED,
  payload: { id, change },
});
export const labelsLoading = () => ({ type: LABELS_LOADING });
export const labelsLoaded = (labels) => ({
  type: LABELS_LOADED,
  payload: labels,
});

export const loadingFailed = () => ({ type: LOADING_FAILED });
export const requestFailed = () => ({ type: REQUEST_FAILED });
export const requestSucceeded = () => ({ type: REQUEST_SUCCEEDED });

export const filterAdded = (id) => ({
  type: FILTER_ADDED,
  payload: id,
});

export const filterRemoved = (id) => ({
  type: FILTER_REMOVED,
  payload: id,
});

export const filtersCleared = () => ({
  type: FILTERS_CLEARED,
});

// middleware functions (thunk - fetch data, post data)

export const fetchLabels = () => async (dispatch) => {
  dispatch(labelsLoading());
  const response = await axios.get("http://localhost:4200/labels");
  dispatch(labelsLoaded(response.data));
};

export const addLabel = (label) => async (dispatch) => {
  const response = await axios.post("http://localhost:4200/labels", label);
  if (response.status === 200) {
    dispatch(labelAdded(response.data));
  } else {
    console.log(response.status, response.message);
  }
};

export const removeLabel = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:4200/labels/${id}`);
  if ((response.status = 200)) {
    dispatch(labelRemoved(id));
  } else {
    console.log("error");
  }
};

export const editLabel = (id, change) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:4200/labels/${id}`,
    change
  );
  if (response.status === 200) {
    dispatch(labelEdited(id, change));
  } else {
    console.log("error");
  }
};

//selectors

const selectLabels = (state) => state.labels.labels;
export const selectFilters = (state) => state.labels.filteredLabels;
const selectLabelById = (state, labelId) => selectLabels(state)[labelId];

export const selectLabelValues = createSelector(selectLabels, (objects) => {
  return Object.values(objects);
});

export const selectColorById = (state, labelId) => {
  const label = selectLabelById(state, labelId);
  return label ? label.color : "grey";
};

export const selectLabelsWithCheckStatus = createSelector(
  selectLabelValues,
  selectFilters,
  (labels, filters) => {
    return labels.map((label) => {
      const isChecked = filters.some((filter) => filter === label.id);
      return { ...label, checked: isChecked };
    });
  }
);

export const selectFilteredLabels = createSelector(
  selectLabelValues,
  selectFilters,
  (labels, filters) => {
    return labels.filter((label) => {
      return filters.some((filter) => filter === label.id);
    });
  }
);

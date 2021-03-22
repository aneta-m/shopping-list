import { combineReducers } from "redux";
import listsReducer from "./features/lists/listsSlice";
import labelsReducer from "./features/labels/labelsSlice";
import currentListReducer from "./features/currentList/currentListSlice";

const rootReducer = combineReducers({
  lists: listsReducer,
  currentList: currentListReducer,
  labels: labelsReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import listsReducer from "./features/lists/listsSlice";
import labelsReducer from "./features/labels/labelsSlice";

const rootReducer = combineReducers({
  lists: listsReducer,
  labels: labelsReducer,
});

export default rootReducer;

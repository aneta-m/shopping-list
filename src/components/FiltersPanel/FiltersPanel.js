import React from "react";
import { useDispatch } from "react-redux";
import Filters from "../Filters/Filters";
import ToggledPanel from "../ToggledPanel/ToggledPanel";
import { filtersCleared } from "../../features/labels/labelsSlice";

// title,
//   handleToggle,
//   toggleDesc,
//   func,
//   funcDesc,
//   children,

const FiltersPanel = ({ onToggle }) => {
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(filtersCleared());
  };
  return (
    <ToggledPanel
      title="Filters"
      handleToggle={onToggle}
      toggleDesc="Edit labels"
      func={clearFilters}
      funcDesc="Clear filters"
    >
      <Filters />
    </ToggledPanel>
  );
};

export default FiltersPanel;

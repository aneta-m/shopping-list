import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditLabelsPanel from "../EditLabelsPanel/EditLabelsPanel";
import FiltersPanel from "../FiltersPanel/FiltersPanel";

const ToggledPanels = () => {
  const [content, setContent] = useState("filters");
  return (
    <div>
      {content === "filters" ? (
        <FiltersPanel onToggle={() => setContent("labels")} />
      ) : (
        <EditLabelsPanel onToggle={() => setContent("filters")} />
      )}
    </div>
  );
};

export default ToggledPanels;

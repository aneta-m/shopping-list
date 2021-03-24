import React, { useState } from "react";
import Labels from "../Labels/Labels";
import ToggledPanel from "../ToggledPanel/ToggledPanel";
import NewLabelModalDialog from "../NewLabelModalDialog/NewLabelModalDialog";
const EditLabelsPanel = ({ onToggle }) => {
  const [isNewLabelDialogOpen, setIsNewLabelDialogOpen] = useState("false");
  const openNewLabelDialog = () => {
    setIsNewLabelDialogOpen(true);
  };

  return (
    <>
      <ToggledPanel
        title="Edit labels..."
        handleToggle={onToggle}
        toggleDesc="OK"
        func={openNewLabelDialog}
        funcDesc="Add new"
      >
        <Labels />
      </ToggledPanel>
      {isNewLabelDialogOpen && (
        <NewLabelModalDialog onClose={() => setIsNewLabelDialogOpen(false)} />
      )}
    </>
  );
};

export default EditLabelsPanel;

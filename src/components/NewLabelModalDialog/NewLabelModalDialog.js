import React, { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import ModalDialog from "../ModalDialog/ModalDialog";

const NewLabelModalDialog = ({ onClose }) => {
  const [value, setValue] = useState("");
  const [color, setColor] = useState("");
  const addLabel = () => {
    console.log(value, color);
  };
  return (
    <ModalDialog
      title="Add new label"
      confirmDesc="OK"
      onConfirm={addLabel}
      onClose={onClose}
    >
      <ColorPicker onChange={(pickedColor) => setColor(pickedColor)} />
      <input
        type="text"
        placeholder="Category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </ModalDialog>
  );
};

export default NewLabelModalDialog;

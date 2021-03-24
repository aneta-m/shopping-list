import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./EditableLabel.module.scss";
import Button from "../Button/Button";
import EditableText from "../EditableText/EditableText";
import ColorPicker from "../ColorPicker/ColorPicker";
import { editLabel, removeLabel } from "../../features/labels/labelsSlice";

const EditableLabel = ({ id, color, text }) => {
  const dispatch = useDispatch();
  const handleRemove = () => dispatch(removeLabel(id));
  const handleChange = (color) => {
    dispatch(editLabel(id, { color }));
  };

  return (
    <div className={styles.editable_label}>
      <ColorPicker color={color} onChange={handleChange} />
      <EditableText
        text={text}
        update={(value) => dispatch(editLabel(id, { title: value }))}
      />
      <Button type="remove" onClick={handleRemove}>
        &times;
      </Button>
    </div>
  );
};

export default EditableLabel;

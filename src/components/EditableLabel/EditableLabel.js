import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./EditableLabel.module.scss";
import Button from "../Button/Button";
import EditableText from "../EditableText/EditableText";
import ColorPicker from "../ColorPicker/ColorPicker";
import { editLabel } from "../../features/labels/labelsSlice";

const EditableLabel = ({ id, color, text }) => {
  // const [currentColor, setCurrentColor] = useState(color);
  const removeLabel = () => console.log("removeLabel");
  const dispatch = useDispatch();

  const handleChange = (color) => {
    dispatch(editLabel(id, { color }));
  };
  // ZMIENIĆ TAK, ŻEBY AKCJA DISPATCHOWAŁA SIĘ W COLOR PICKERZE DOPIERO PO JEGO ZAMKNIĘCIU A NIE NA ON CHANGE
  // PLUS POPRAWIĆ REQUEST BO SIĘ WYSYPUJE ...

  return (
    <div className={styles.editable_label}>
      <ColorPicker color={color} onChange={handleChange} />
      <EditableText
        text={text}
        update={(value) => dispatch(editLabel(id, { title: value }))}
      />
      <Button type="remove" onClick={removeLabel}>
        &times;
      </Button>
    </div>
  );
};

export default EditableLabel;

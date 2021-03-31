import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./EditableLabel.module.scss";
import Button from "../Button/Button";
import EditableText from "../EditableText/EditableText";
import ColorPicker from "../ColorPicker/ColorPicker";
import ModalDialog from "../ModalDialog/ModalDialog";
import { editLabel, removeLabel } from "../../features/labels/labelsSlice";

const EditableLabel = ({ id, color, text }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (color) => {
    dispatch(editLabel(id, { color }));
  };

  return (
    <>
      <div className={styles.editable_label}>
        <ColorPicker color={color} onChange={handleChange} />
        <EditableText
          text={text}
          update={(value) => dispatch(editLabel(id, { title: value }))}
        />
        <Button type="remove" onClick={() => setIsConfirmDialogOpen(true)}>
          &times;
        </Button>
      </div>
      {isConfirmDialogOpen ? (
        <ModalDialog
          title="Delete confirmation"
          confirmDesc="Delete"
          onConfirm={() => {
            dispatch(removeLabel(id));
          }}
          onClose={() => setIsConfirmDialogOpen(false)}
        >
          Delete this label?
        </ModalDialog>
      ) : (
        ""
      )}
    </>
  );
};

export default EditableLabel;

//dodać confirm dialog przed remove

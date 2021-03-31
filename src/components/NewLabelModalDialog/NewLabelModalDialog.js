import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ColorPicker from "../ColorPicker/ColorPicker";
import ModalDialog from "../ModalDialog/ModalDialog";
import Input from "../Input/Input";
import SmallText from "../SmallText/SmallText";
import styles from "./NewLabelModalDialog.module.scss";
import { addLabel } from "../../features/labels/labelsSlice";

const NewLabelModalDialog = ({ onClose }) => {
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#999");
  const [isNotValid, setIsNotValid] = useState(false);
  const dispatch = useDispatch();
  const addNewLabel = () => {
    dispatch(
      addLabel({
        title: value,
        color: color,
      })
    );
  };

  const addNewLabelAndCloseModal = () => {
    addNewLabel();
    onClose();
  };

  const handleConfirm = () => {
    value.trim().length > 0 ? addNewLabelAndCloseModal() : setIsNotValid(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    e.target.value.trim().length > 0 && setIsNotValid(false);
  };
  return (
    <ModalDialog
      title="Add new label"
      confirmDesc="OK"
      onConfirm={handleConfirm}
      onClose={onClose}
    >
      <div className={styles.modal_content}>
        <ColorPicker
          color={color}
          onChange={(pickedColor) => setColor(pickedColor)}
        />
        <Input
          placeholder="Category name"
          value={value}
          onChange={handleChange}
        />
        {isNotValid ? (
          <SmallText className={styles.modal_validation}>
            <span className={styles.modal_validation_icon}>
              <i className="fas fa-exclamation"></i>
            </span>
            The name field cannot be empty.
          </SmallText>
        ) : (
          ""
        )}
      </div>
    </ModalDialog>
  );
};

export default NewLabelModalDialog;

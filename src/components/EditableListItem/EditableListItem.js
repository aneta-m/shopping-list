import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import EditableText from "../EditableText/EditableText";
import Dropdown from "../Dropdown/Dropdown";
import LabelsList from "../LabelsList/LabelsList";
import Label from "../Label/Label";
import styles from "./EditableListItem.module.scss";
import {
  removeListItem,
  editListItem,
} from "../../features/currentList/currentListSlice";
import ModalDialog from "../ModalDialog/ModalDialog";

const EditableListItem = ({ labelId, id, text, maxTextLength }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdown((prevState) => !prevState);
  };
  const updateText = (value) => {
    dispatch(editListItem(id, { text: value }));
  };

  const updateLabelId = (labelId) => {
    dispatch(editListItem(id, { labelId }));
    toggleDropdown();
  };

  return (
    <li className={styles.editable_li}>
      <Label onClick={toggleDropdown} colorId={labelId}></Label>
      {isDropdown && (
        <div className={styles.dropdown}>
          <Dropdown closeDropdown={() => setIsDropdown(false)}>
            <LabelsList onClick={updateLabelId} />
          </Dropdown>
        </div>
      )}
      <EditableText
        text={text}
        update={updateText}
        maxLength={maxTextLength ? maxTextLength : null}
      />
      <Button
        type="remove"
        onClick={() => setIsConfirmDialogOpen(true)}
        propagation
      >
        &times;
      </Button>
      {isConfirmDialogOpen ? (
        <ModalDialog
          title="Delete confirmation"
          confirmDesc="Delete"
          onConfirm={() => {
            dispatch(removeListItem(id));
          }}
          onClose={() => setIsConfirmDialogOpen(false)}
        >
          Delete this item?
        </ModalDialog>
      ) : null}
    </li>
  );
};

export default EditableListItem;

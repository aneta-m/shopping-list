import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Label from "../Label/Label";
import Dropdown from "../Dropdown/Dropdown";
import LabelsList from "../LabelsList/LabelsList";
import styles from "./EmptyListItem.module.scss";
import { addListItem } from "../../features/currentList/currentListSlice";

const EmptyListItem = ({ maxTextLength }) => {
  const [labelId, setLabelId] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdown((prevState) => !prevState);
  };

  const onSubmit = (value) => {
    dispatch(
      addListItem({
        text: value,
        labelId,
      })
    );
    setLabelId(false);
  };

  const onBlur = (e) => {
    console.log(e.target.value);
  };

  const updateLabelId = (labelId) => {
    console.log("label change for empty item: ", labelId);
    setLabelId(labelId);
    toggleDropdown();
  };

  return (
    <li className={styles.empty_li}>
      <Label onClick={toggleDropdown} colorId={labelId}></Label>
      {isDropdown && (
        <div className={styles.dropdown}>
          <Dropdown closeDropdown={() => setIsDropdown(false)}>
            <LabelsList onClick={updateLabelId} />
          </Dropdown>
        </div>
      )}
      <TextInput
        placeholder="Add new item..."
        maxLength={maxTextLength && maxTextLength}
        autofocus
        onSubmit={onSubmit}
        onBlur={onBlur}
        submitBtn={(submitFunc) => (
          <Button type="add" onClick={submitFunc}>
            &#43;
          </Button>
        )}
      />
    </li>
  );
};

export default EmptyListItem;

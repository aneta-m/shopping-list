import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ListHeader.module.scss";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import SelectList from "../SelectList/SelectList";
import ModalDialog from "../ModalDialog/ModalDialog";
import SmallText from "../SmallText/SmallText";
import EditableText from "../EditableText/EditableText";
import { sortOptions } from "../../features/lists/sortOptions";
import { removeList } from "../../features/lists/listsSlice";
import {
  selectFilteredLabels,
  filtersCleared,
} from "../../features/labels/labelsSlice";
import { editListTitle } from "../../features/lists/listsSlice";

const ListHeader = ({
  listId,
  listTitle,
  isMobile,
  toggleFilter,
  sortingMethod,
  onSortingMethodChange,
}) => {
  const dispatch = useDispatch();
  const filteredLabels = useSelector(selectFilteredLabels);

  const [isDropdown, setIsDropdown] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const toggleDropdown = () => setIsDropdown((prevState) => !prevState);
  const updateListTitle = (text) =>
    dispatch(editListTitle(listId, { title: text }));
  const removeListAndClearFiltersAndSorting = () => {
    dispatch(removeList(listId));
    dispatch(filtersCleared());
    onSortingMethodChange(null);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  return (
    <>
      <div className={styles.header}>
        <EditableText
          type="heading"
          text={listTitle ? listTitle : ""}
          update={updateListTitle}
        ></EditableText>

        <div className={styles.header_btns}>
          {isMobile ? null : (
            <Button className={styles.header_btn} onClick={toggleFilter}>
              <i className="fas fa-filter"></i>
            </Button>
          )}
          <Button className={styles.header_btn} onClick={toggleDropdown}>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </div>

        {isDropdown ? (
          <div className={styles.dropdown}>
            <Dropdown closeDropdown={toggleDropdown}>
              <SelectList
                options={[
                  ...sortOptions.map((option) => {
                    return {
                      ...option,
                      name: `Sort ${option.name}`,
                      onClick: onSortingMethodChange,
                    };
                  }),
                  {
                    value: "delete",
                    name: "Remove list",
                    onClick: () => setIsConfirmDialogOpen(true),
                  },
                ]}
                value={sortingMethod}
              />
            </Dropdown>
          </div>
        ) : null}
      </div>
      <div>
        <SmallText className={styles.small_text}>
          {sortingMethod &&
            `Sorted ${
              sortOptions.find((option) => option.value === sortingMethod).name
            }`}
        </SmallText>
        {filteredLabels.length > 0 && (
          <SmallText
            className={styles.small_text}
          >{`Filtered categories:${filteredLabels.map(
            (label) => " " + label.title
          )}`}</SmallText>
        )}
      </div>
      {isConfirmDialogOpen ? (
        <ModalDialog
          title="Delete confirmation"
          confirmDesc="Delete"
          onConfirm={() => {
            removeListAndClearFiltersAndSorting();
            closeConfirmDialog();
          }}
          onClose={closeConfirmDialog}
        >
          Delete this list?
        </ModalDialog>
      ) : (
        ""
      )}
    </>
  );
};

export default ListHeader;

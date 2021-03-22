import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ListHeader.module.scss";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import SelectList from "../SelectList/SelectList";
import ModalDialog from "../ModalDialog/ModalDialog";
import { sortOptions } from "../../features/lists/sortOptions";
import { removeList } from "../../features/lists/listsSlice";
import {
  selectFilteredLabels,
  filtersCleared,
} from "../../features/labels/labelsSlice";

const ListHeader = ({
  id,
  isMobile,
  toggleFilter,
  sortingMethod,
  onSortingMethodChange,
  children,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const toggleDropdown = () => setIsDropdown((prevState) => !prevState);
  const dispatch = useDispatch();
  const filteredLabels = useSelector(selectFilteredLabels);
  const removeListAndClearFiltersAndSorting = () => {
    dispatch(removeList(id));
    dispatch(filtersCleared());
    onSortingMethodChange(null);
  };

  return (
    <>
      <div className={styles.header}>
        {children}

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
        <div className={styles.small_text}>
          {sortingMethod
            ? `Sorted ${
                sortOptions.find((option) => option.value === sortingMethod)
                  .name
              }`
            : ""}
        </div>
        {filteredLabels.length > 0 && (
          <div
            className={styles.small_text}
          >{`Filtered categories:${filteredLabels.map(
            (label) => " " + label.title
          )}`}</div>
        )}
      </div>
      {isConfirmDialogOpen ? (
        <ModalDialog
          title="Delete confirmation"
          desc="Delete this list?"
          confirmDesc="Delete"
          onConfirm={removeListAndClearFiltersAndSorting}
          onClose={() => setIsConfirmDialogOpen(false)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ListHeader;

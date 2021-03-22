import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Filters.module.scss";
import List from "../List/List";
import Label from "../Label/Label";
import {
  filterAdded,
  filterRemoved,
  filtersCleared,
} from "../../features/labels/labelsSlice";

const Filters = ({ labels }) => {
  const dispatch = useDispatch();
  const clearFilters = () => dispatch(filtersCleared);

  useEffect(() => {
    return clearFilters;
  });
  return (
    <div className={styles.labels}>
      <List className={styles.labels_list}>
        {labels.map((label) => (
          <Label
            colorId={label.id}
            key={label.id}
            text={label.title}
            className="py-025"
            isChecked={label.checked}
            onClick={() =>
              label.checked
                ? dispatch(filterRemoved(label.id))
                : dispatch(filterAdded(label.id))
            }
          />
        ))}
      </List>
    </div>
  );
};

export default Filters;

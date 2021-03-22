import React, { useState, useEffect } from "react";
import Labels from "../Labels/Labels";
import Filters from "../Filters/Filters";
import Button from "../Button/Button";
import styles from "./ToggledFilters.module.scss";
import {
  selectLabelValues,
  selectLabelsWithCheckStatus,
  filtersCleared,
} from "../../features/labels/labelsSlice";
import { useSelector, useDispatch } from "react-redux";

const ToggledFilters = () => {
  const [content, setContent] = useState("filters");
  const labels = useSelector(selectLabelValues);
  const labelsWithCheckStatus = useSelector(selectLabelsWithCheckStatus);
  const dispatch = useDispatch();

  return (
    <div>
      {content === "filters" ? (
        <div>
          <h1 className={styles.hd}>Filters</h1>
          <Filters labels={labelsWithCheckStatus} />
          <div className={styles.flex_btns}>
            <Button
              type="secondary"
              className={styles.btn}
              onClick={() => {
                setContent("labels");
              }}
            >
              Edit labels
            </Button>
            <Button
              type="secondary"
              className={styles.btn}
              onClick={() => {
                dispatch(filtersCleared());
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className={styles.hd}>Edit labels...</h1>
          <Labels labels={labels} />
          <div className={styles.flex_btns}>
            <Button type="light" className={styles.btn}>
              Add filter
            </Button>
            <Button
              type="secondary"
              className={styles.btn}
              onClick={() => setContent("filters")}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggledFilters;

import React from "react";
import { useSelector } from "react-redux";
import styles from "./LabelsList.module.scss";
import Label from "../Label/Label";
import { selectLabelValues } from "../../features/labels/labelsSlice";

const LabelsList = ({ onClick }) => {
  const labels = useSelector(selectLabelValues);
  console.log(labels);
  return (
    <ul className={styles.labels_list}>
      {labels.map((label) => (
        <Label
          colorId={label.id}
          text={label.title}
          key={label.id}
          onClick={() => onClick(label.id)}
        ></Label>
      ))}
    </ul>
  );
};

export default LabelsList;

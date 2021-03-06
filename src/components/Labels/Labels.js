import React from "react";
import List from "../List/List";
import EditableLabel from "../EditableLabel/EditableLabel";
import styles from "./Labels.module.scss";
import { useSelector } from "react-redux";
import { selectLabelValues } from "../../features/labels/labelsSlice";

const Labels = () => {
  const labels = useSelector(selectLabelValues);

  return (
    <div>
      <List>
        {labels.map((label) => (
          <EditableLabel
            color={label.color}
            id={label.id}
            key={label.id}
            text={label.title}
          />
        ))}
      </List>
    </div>
  );
};

export default Labels;

import React from "react";
import styles from "./ColorPicker.module.scss";
import { debounce } from "../../helpers/helpers";

const ColorPicker = ({ color, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <label className={styles.label} style={{ backgroundColor: color }}>
      <input
        className={styles.input}
        type="color"
        onChange={debounce(handleChange, 100)}
        defaultValue={color}
      />
    </label>
  );
};

export default ColorPicker;

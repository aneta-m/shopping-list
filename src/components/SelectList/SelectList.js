import React, { useState } from "react";
import styles from "./SelectList.module.scss";
const SelectList = ({ options, value }) => {
  return (
    <div className={styles.options_list}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.option} ${
            option.value === value ? styles.option_active : ""
          }`}
          onClick={() => {
            option.value !== value
              ? option.onClick(option.value)
              : option.onClick(null);
          }}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default SelectList;

import React, { useState } from "react";
import styles from "./TextInput.module.scss";

const TextInput = ({ placeholder, maxLength, onSubmit, submitBtn }) => {
  const [value, setValue] = useState("");

  const updateText = (e) => {
    setValue(e.target.value);
  };

  const updateItem = () => {
    const trimmedText = value.trim();
    if (!trimmedText.length) {
      return;
    }
    onSubmit(trimmedText);
    setValue("");
  };

  const handleKeyUp = (e) => {
    if (e.which === 13) {
      updateItem();
    }
  };
  return (
    <>
      <input
        className={styles.empty_text}
        type="text"
        onChange={updateText}
        onKeyUp={handleKeyUp}
        maxLength={maxLength}
        placeholder={placeholder}
        autoFocus
        value={value}
      />
      {submitBtn && submitBtn(updateItem)}
    </>
  );
};

export default TextInput;

import React from "react";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, requestSucceeded } from "../../features/lists/listsSlice";
import { FAILED } from "../../features/status/statusConstants";

const PageErrorModal = () => {
  // const requestError = useSelector(getStatus);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(requestSucceeded());
    window.location.reload();
  };

  return (
    <ModalDialog
      title="Error"
      confirmDesc="OK"
      onConfirm={handleClick}
      onClose={() => dispatch(requestSucceeded())}
    >
      "Something went wrong, please refresh and try again."
    </ModalDialog>
  );
};

export default PageErrorModal;

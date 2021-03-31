import React from "react";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useSelector } from "react-redux";
import { getRequestStatus } from "../../features/lists/listsSlice";
import { FAILED } from "../../features/status/statusConstants";

const PageErrorModal = () => {
  const requestStatus = useSelector(getRequestStatus);

  return requestStatus === FAILED ? (
    <ModalDialog
      title="Error"
      confirmDesc="OK"
      onConfirm={() => window.location.reload()}
    >
      Something went wrong. Please refresh and try again in a moment.
    </ModalDialog>
  ) : null;
};

export default PageErrorModal;

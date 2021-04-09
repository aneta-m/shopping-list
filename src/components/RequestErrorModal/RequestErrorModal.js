import React from "react";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useSelector } from "react-redux";
import { getRequestStatus as getListsRequestStatus } from "../../features/lists/listsSlice";
import { getRequestStatus as getLabelsRequestStatus } from "../../features/labels/labelsSlice";
import { getRequestStatus as getCurrentListRequestStatus } from "../../features/currentList/currentListSlice";

import { FAILED } from "../../features/status/statusConstants";

const RequestErrorModal = () => {
  const listsRequestStatus = useSelector(getListsRequestStatus);
  const labelsRequestStatus = useSelector(getLabelsRequestStatus);
  const currentListRequestStatus = useSelector(getCurrentListRequestStatus);

  const isRequestError =
    listsRequestStatus === FAILED ||
    labelsRequestStatus === FAILED ||
    currentListRequestStatus === FAILED;

  return isRequestError ? (
    <ModalDialog
      title="Error"
      confirmDesc="OK"
      onConfirm={() => window.location.reload()}
    >
      Something went wrong. Please refresh and try again in a moment.
    </ModalDialog>
  ) : null;
};

export default RequestErrorModal;

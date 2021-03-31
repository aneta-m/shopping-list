import React, { useState } from "react";
import FlexContainer from "../FlexContainer/FlexContainer";
import Button from "../Button/Button";
import ModalDialog from "../ModalDialog/ModalDialog";
import { fetchList } from "../../features/currentList/currentListSlice";
import { removeList } from "../../features/lists/listsSlice";
import { useDispatch } from "react-redux";

const ListIndexItem = ({ id, title }) => {
  const dispatch = useDispatch();
  const setCurrentList = (id) => dispatch(fetchList(id));
  const [confirmRemoveDialog, setConfirmRemoveDialog] = useState(false);

  return (
    <>
      <li>
        <FlexContainer>
          <Button
            type="full_width"
            link
            to={`/lists/${id}`}
            onClick={() => setCurrentList(id)}
          >
            {title}
          </Button>
          <Button type="remove" onClick={() => setConfirmRemoveDialog(true)}>
            &times;
          </Button>
        </FlexContainer>
      </li>
      {confirmRemoveDialog ? (
        <ModalDialog
          title="Delete confirmation"
          confirmDesc="Delete"
          onConfirm={() => {
            dispatch(removeList(id));
            setConfirmRemoveDialog(false);
          }}
          onClose={() => setConfirmRemoveDialog(false)}
        >
          Delete this list?
        </ModalDialog>
      ) : (
        ""
      )}
    </>
  );
};

export default ListIndexItem;

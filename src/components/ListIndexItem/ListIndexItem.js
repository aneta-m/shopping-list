import React, { useState } from "react";
import { useSelector } from "react-redux";
import FlexContainer from "../FlexContainer/FlexContainer";
import Button from "../Button/Button";
import ModalDialog from "../ModalDialog/ModalDialog";
import {
  fetchList,
  getCurrentListId,
} from "../../features/currentList/currentListSlice";
import { removeList } from "../../features/lists/listsSlice";
import { useDispatch } from "react-redux";

const ListIndexItem = ({ id, title, onItemClick }) => {
  const dispatch = useDispatch();
  const currentListId = useSelector(getCurrentListId);
  const setCurrentList = (id) => dispatch(fetchList(id));
  const [confirmRemoveDialog, setConfirmRemoveDialog] = useState(false);
  const handleItemClick = () => {
    setCurrentList(id);
    onItemClick && onItemClick();
  };
  const isListViewed = currentListId === id;

  return (
    <>
      {isListViewed ? (
        <li>
          <FlexContainer>
            <Button type="li_selected">{title}</Button>
            <Button type="remove" onClick={() => setConfirmRemoveDialog(true)}>
              &times;
            </Button>
          </FlexContainer>
        </li>
      ) : (
        <li>
          <FlexContainer>
            <Button
              type="full_width"
              link
              to={`/lists/${id}`}
              onClick={handleItemClick}
            >
              {title}
            </Button>
            <Button type="remove" onClick={() => setConfirmRemoveDialog(true)}>
              &times;
            </Button>
          </FlexContainer>
        </li>
      )}
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

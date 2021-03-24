import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import MobileNav from "../../components/MobileNav/MobileNav";
import Main from "../../components/Main/Main";
import List from "../../components/List/List";
import Button from "../../components/Button/Button";
import FlexListItem from "../../components/FlexContainer/FlexContainer";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { getListsArray, removeList } from "../../features/lists/listsSlice";
import { fetchList } from "../../features/currentList/currentListSlice";

const Lists = ({ isMobile }) => {
  const lists = useSelector(getListsArray);
  const dispatch = useDispatch();
  const setCurrentList = (id) => dispatch(fetchList(id));
  const [confirmRemoveDialogId, setConfirmRemoveDialogId] = useState(false);
  return (
    <>
      <Header isMobile={isMobile} type="lists" />
      {isMobile && <MobileNav type="lists" />}
      <Main isMobile={isMobile} type="lists">
        <h2 className="py-1">Twoje listy</h2>

        <List>
          {lists.map((list) => (
            <FlexListItem key={list.id}>
              <Button
                type="full_width"
                link
                to={`/lists/${list.id}`}
                onClick={() => setCurrentList(list.id)}
              >
                {list.title}
              </Button>
              <Button
                type="remove"
                onClick={() => setConfirmRemoveDialogId(list.id)}
              >
                &times;
              </Button>
            </FlexListItem>
          ))}
        </List>
      </Main>
      {confirmRemoveDialogId ? (
        <ModalDialog
          title="Delete confirmation"
          desc="Delete this list?"
          confirmDesc="Delete"
          onConfirm={() => {
            dispatch(removeList(confirmRemoveDialogId));
            setConfirmRemoveDialogId(false);
          }}
          onClose={() => setConfirmRemoveDialogId(false)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Lists;

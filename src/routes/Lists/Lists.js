import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ListRoute from "./ListRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import {
  getLastListId,
  getListsArray,
  getLoadingStatus as getListsLoadingStatus,
} from "../../features/lists/listsSlice";
import useAddNewList from "../../hooks/lists/useAddNewList";
import { SUCCEEDED } from "../../features/status/statusConstants";

const Lists = ({ isMobile }) => {
  const lists = useSelector(getListsArray);
  const listsLoadingStatus = useSelector(getListsLoadingStatus);
  const lastListId = useSelector(getLastListId);
  const addList = useAddNewList();
  const routePath = useRouteMatch().path;
  useEffect(() => {
    if (listsLoadingStatus === SUCCEEDED && lists.length === 0) {
      console.log("tu");
      addList();
    }
  }, [listsLoadingStatus]);
  return (
    <>
      <Header isMobile={isMobile} />
      <Switch>
        <Route path={routePath} exact>
          <Redirect to={`${routePath}${lastListId}`} />
        </Route>
        <Route
          path={`${routePath}:id`}
          children={<ListRoute isMobile={isMobile} />}
        />
      </Switch>
    </>
  );
};
export default Lists;

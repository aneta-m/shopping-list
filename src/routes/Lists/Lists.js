import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ListRoute from "./ListRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getLastListId } from "../../features/lists/listsSlice";

const Lists = ({ isMobile }) => {
  const lastListId = useSelector(getLastListId);
  return (
    <>
      <Header isMobile={isMobile} />
      <Switch>
        <Route path="/lists" exact>
          <Redirect to={`/lists/${lastListId}`} />
        </Route>
        <Route
          path={`/lists/:id`}
          children={<ListRoute isMobile={isMobile} />}
        />
      </Switch>
    </>
  );
};
export default Lists;

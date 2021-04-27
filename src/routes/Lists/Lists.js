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
import { getLastListId } from "../../features/lists/listsSlice";

const Lists = ({ isMobile }) => {
  const lastListId = useSelector(getLastListId);
  const routePath = useRouteMatch().path;
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

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ListsContent from "../../components/ListsContent/ListsContent";
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
  console.log(lastListId);
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <>
      <Header isMobile={isMobile} />
      <Switch>
        <Route path="/lists" exact>
          <Redirect to={`/lists/${lastListId}`} />
        </Route>
        <Route
          path={`/lists/:id`}
          children={<ListsContent isMobile={isMobile} />}
        />
      </Switch>
    </>
  );
};
export default Lists;

import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import ListsContent from "../../components/ListsContent/ListsContent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Lists = ({ isMobile }) => {
  useEffect(() => {}, []);
  return (
    <>
      <Header isMobile={isMobile} />
      <Switch>
        <Route path="/" exact>
          {/* <Redirect to={`/${currentListId}`} />/ */}
        </Route>
        <Route path="/:id">
          <ListsContent isMobile={isMobile} />
        </Route>
      </Switch>
    </>
  );
};
export default Lists;

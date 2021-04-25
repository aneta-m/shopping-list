import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Page from "./components/Page/Page";
import Page404 from "./components/Page404/Page404";
import Lists from "./routes/Lists/Lists";
import Footer from "./components/Footer/Footer";
import RequestErrorModal from "./components/RequestErrorModal/RequestErrorModal";

import { fetchLists } from "./features/lists/listsSlice";
import { fetchLabels } from "./features/labels/labelsSlice";
import { useWindowResize } from "./hooks/useWindowResize";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const updatePredicate = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLists());
    dispatch(fetchLabels());
  }, []);

  useWindowResize(updatePredicate);

  return (
    <Router>
      <Page>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/lists" />
          </Route>
          <Route path="/lists/">
            <Lists isMobile={isMobile} />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
        <Footer />
      </Page>
      <RequestErrorModal />
    </Router>
  );
}

export default App;

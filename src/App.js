import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Page from "./components/Page/Page";
import Header from "./components/Header/Header";
import Home from "./routes/Home/Home";
import Lists from "./routes/Lists/Lists";
import PageErrorModal from "./components/PageErrorModal/PageErrorModal";
import Footer from "./components/Footer/Footer";

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
            <Home isMobile={isMobile} />
          </Route>
          <Route path="/lists">
            <Lists isMobile={isMobile} />
          </Route>
        </Switch>
        <Footer />
        <PageErrorModal />
      </Page>
    </Router>
  );
}

export default App;

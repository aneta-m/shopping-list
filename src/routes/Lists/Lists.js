import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import MobileNav from "../../components/MobileNav/MobileNav";
import Main from "../../components/Main/Main";
import ToggledPanels from "../../components/ToggledPanels/ToggledPanels";
import CollapsiblePanel from "../../components/CollapsiblePanel/CollapsiblePanel";
import CurrentListView from "../../components/CurrentListView/CurrentListView";
import ListIndex from "../../components/ListIndex/ListIndex";

const Lists = ({ isMobile }) => {
  const [isRightPanelShown, setIsRightPanelShown] = useState(false);
  const [isRightPanelClosing, setIsRightPanelClosing] = useState(true);

  const toggleRightPanel = () => {
    setIsRightPanelShown((prevState) => !prevState);
    isRightPanelClosing &&
      setIsRightPanelClosing(
        (prevIsRightPanelClosing) => !prevIsRightPanelClosing
      );
  };

  const closeRightPanel = () => {
    setIsRightPanelClosing(
      (prevIsRightPanelClosing) => !prevIsRightPanelClosing
    );
  };

  const [isLeftPanelShown, setIsLeftPanelShown] = useState(false);
  const [isLeftPanelClosing, setIsLeftPanelClosing] = useState(true);

  const toggleLeftPanel = () => {
    console.log(isLeftPanelShown);
    setIsLeftPanelShown((prevState) => !prevState);
    isLeftPanelClosing &&
      setIsLeftPanelClosing(
        (prevIsLeftPanelClosing) => !prevIsLeftPanelClosing
      );
  };

  return (
    <>
      <Header isMobile={isMobile} />

      {isMobile ? (
        <MobileNav
          type="main"
          toggleRightPanel={toggleRightPanel}
          toggleLeftPanel={toggleLeftPanel}
        />
      ) : (
        <Aside>
          <h2 className="py-1">Twoje listy</h2>
          <ListIndex />

          {isRightPanelShown && (
            <CollapsiblePanel
              onClose={toggleRightPanel}
              direction="right"
              isClosing={isRightPanelClosing}
            >
              <ToggledPanels />
            </CollapsiblePanel>
          )}
        </Aside>
      )}
      <Main>
        <CurrentListView
          isMobile={isMobile}
          toggleFilter={isRightPanelShown ? closeRightPanel : toggleRightPanel}
        />
      </Main>
      {isRightPanelShown && isMobile && (
        <CollapsiblePanel onClose={toggleRightPanel} direction="right">
          <ToggledPanels />
        </CollapsiblePanel>
      )}
      {isLeftPanelShown && isMobile && (
        <CollapsiblePanel onClose={toggleLeftPanel} direction="left">
          <h1>Twoje listy</h1>
          <ListIndex className="py-1" />
        </CollapsiblePanel>
      )}
    </>
  );
};

export default Lists;

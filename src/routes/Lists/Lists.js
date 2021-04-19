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
  const [isFilterPanelShown, setIsFilterPanelShown] = useState(false);
  const [isFilterPanelClosing, setIsFilterPanelClosing] = useState(true);

  const toggleFilterPanel = () => {
    setIsFilterPanelShown((prevState) => !prevState);
    isFilterPanelClosing &&
      setIsFilterPanelClosing(
        (prevIsFilterPanelClosing) => !prevIsFilterPanelClosing
      );
  };

  const closeFilterPanel = () => {
    setIsFilterPanelClosing(
      (prevIsFilterPanelClosing) => !prevIsFilterPanelClosing
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
        <>
          <MobileNav
            type="main"
            toggleRightPanel={toggleFilterPanel}
            toggleLeftPanel={toggleLeftPanel}
          />
          <Main>
            <CurrentListView
              isMobile={isMobile}
              toggleFilter={
                isFilterPanelShown ? closeFilterPanel : toggleFilterPanel
              }
            />
          </Main>
          {isFilterPanelShown && isMobile && (
            <CollapsiblePanel onClose={toggleFilterPanel} direction="right">
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
      ) : (
        <>
          <Aside>
            <h2 className="py-1">Twoje listy</h2>
            <ListIndex />

            {isFilterPanelShown && (
              <CollapsiblePanel
                onClose={toggleFilterPanel}
                direction="left"
                isClosing={isFilterPanelClosing}
              >
                <ToggledPanels />
              </CollapsiblePanel>
            )}
          </Aside>
          <Main>
            <CurrentListView
              isMobile={isMobile}
              toggleFilter={
                isFilterPanelShown ? closeFilterPanel : toggleFilterPanel
              }
            />
          </Main>
        </>
      )}
      ;
    </>
  );
};
export default Lists;

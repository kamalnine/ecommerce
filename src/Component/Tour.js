import React, { useState } from "react";
import JoyRide from "react-joyride";
import { Tooltip } from "react-tippy";
import { SiTourbox } from "react-icons/si";

const TOUR_STEPS = [
  {
    target: '.logo',
    content : 'This is a logo of our app'
  },
];

const Tour = ({ target }) => {
  const [runTour, setRunTour] = useState(false);

  const handleTourStart = () => {
    console.log("Starting tour...");
    setRunTour(true);
  };

  return (
    <>
      <Tooltip title="Start Tour">
        <div className="tour-icon" onClick={handleTourStart}>
          <SiTourbox style={{ fontSize: "25px", color: "white" }} />
        </div>
      </Tooltip>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        run={runTour}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "green",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
          skip: "Close tour",
        }}
        scrollToFirstStep={true}
        disableScrolling={true}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        floaterProps={{
          disableAnimation: true,
        }}
        spotlightPadding={0}
        spotlightClicks={true}
        spotlightClickOutside={true}
        spotlightContinuous={true}
        disableScrollParentFix={true}
        callback={(data) => {
          // You can add your logic here for callbacks
        }}
       
      />
    </>
  );
};

export default Tour;

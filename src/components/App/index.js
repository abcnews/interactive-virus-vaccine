import React, { useState, useEffect } from "react";
import styles from "./styles.scss";

import BackgroundStage from "../BackgroundStage";
import CustomPanel from "../CustomPanel";

import Scrollyteller, {
  loadOdysseyScrollyteller
} from "@abcnews/scrollyteller";

const scrollyData = loadOdysseyScrollyteller(
  "", // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
  "mark" // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

let observer;

export default props => {
  const [storyState, setStoryState] = useState();

  const processMarker = (event, test) => {
    setStoryState({ name: event.key, event: event });
  };

  const doObserved = (entries, observer) => {
    entries.forEach(entry => {
      console.log(entry);
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  };

  useEffect(() => {
    observer = new IntersectionObserver(doObserved, {
      root: null,
      rootMargin: "0px",
      threshold: 0.0
    });

    const scrolloutPanels = document.querySelectorAll(
      ".custom-scrollout-panel"
    );

    scrolloutPanels.forEach(panel => {
      observer.observe(panel);
    });
  }, []);

  return (
    <Scrollyteller
      panels={scrollyData.panels}
      onMarker={processMarker}
      panelComponent={CustomPanel}
    >
      <BackgroundStage storyState={storyState} />
    </Scrollyteller>
  );
};

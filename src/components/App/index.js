import React from "react";
import styles from "./styles.scss";
import worm from "./worm.svg";

import Scrollyteller, {
  loadOdysseyScrollyteller
} from "@abcnews/scrollyteller";

const scrollyData = loadOdysseyScrollyteller(
  "", // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
  "mark" // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

export default props => {
  return (
    <div className={styles.root}>
      <img className={styles.worm} src={worm} />
      <h1>{props.projectName}</h1>
      <Scrollyteller
        panels={scrollyData.panels}
        onMarker={() => console.log("mark")}
      >
        A TEST
      </Scrollyteller>
    </div>
  );
};

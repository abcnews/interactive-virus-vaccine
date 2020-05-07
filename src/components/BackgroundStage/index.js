import "./keyshapejs.js";

import React from "react";
import SVG from "react-inlinesvg";
import { Keyshape } from "react-keyshape";

import styles from "./styles.scss";

import testsvg from "./animation-test.svg";

export default props => {
  return (
    <div className={styles.root}>
      <Keyshape
        svg={testsvg}
        callback={(player, keyshapeElement) => {
          setTimeout(() => {
            player.pause();
          }, 8000); // Pauses the animation after 8s.
        }}
      />
    </div>
  );
};

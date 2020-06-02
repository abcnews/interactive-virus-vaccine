import "./keyshapejs.js";
if (KeyshapeJS.version.indexOf("1.") != 0)
  throw Error("Expected KeyshapeJS v1.*.*");
window.ks = document.ks = KeyshapeJS;

import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { useWindowSize } from "@react-hook/window-size";

import styles from "./styles.scss";
import testsvg from "./images/vax.svg";
import virus from "./images/virus.svg";

import { has } from "lodash";

// Load our animation files and JavaScript animations
const sequences = {
  default: {
    one: {
      svg: require("./sequence/vaccine1-1.svg"),
      animation: require("./animations/vaccine1-1"),
      index: 1
    },
    two: {
      svg: require("./sequence/vaccine1-2.svg"),
      animation: require("./animations/vaccine1-2"),
      index: 2
    },
    three: {
      svg: require("./sequence/vaccine1-3.svg"),
      animation: require("./animations/vaccine1-3"),
      index: 3
    },
    four: {
      svg: require("./sequence/vaccine1-4.svg"),
      animation: require("./animations/vaccine1-4"),
      index: 4
    },
    five: {
      svg: require("./sequence/vaccine1-5.svg"),
      animation: require("./animations/vaccine1-5"),
      index: 5
    },
    six: {
      svg: require("./sequence/vaccine1-6.svg"),
      animation: require("./animations/vaccine1-6"),
      index: 6
    },
    seven: {
      svg: require("./sequence/vaccine1-7.svg"),
      animation: require("./animations/vaccine1-7"),
      index: 7
    },
    eight: {
      svg: require("./sequence/vaccine1-8.svg"),
      animation: require("./animations/vaccine1-8"),
      index: 8
    },
    nine: {
      svg: require("./sequence/vaccine1-9.svg"),
      animation: require("./animations/vaccine1-9"),
      index: 9
    },
    ten: {
      svg: require("./sequence/vaccine1-10.svg"),
      animation: require("./animations/vaccine1-10"),
      index: 10
    },
    eleven: {
      svg: require("./sequence/vaccine1-11.svg"),
      animation: require("./animations/vaccine1-11"),
      index: 11
    },
    twelve: {
      svg: require("./sequence/vaccine1-12.svg"),
      animation: require("./animations/vaccine1-12"),
      index: 12
    },
    thirteen: {
      svg: require("./sequence/vaccine2-1.svg"),
      animation: require("./animations/vaccine2-1"),
      index: 14 - 1
    },
    fourteen: {
      svg: require("./sequence/vaccine2-2.svg"),
      animation: require("./animations/vaccine2-2"),
      index: 14
    },
    fifteen: {
      svg: require("./sequence/vaccine2-3.svg"),
      animation: require("./animations/vaccine2-3"),
      index: 15
    },
    sixteen: {
      svg: require("./sequence/vaccine2-4.svg"),
      animation: require("./animations/vaccine2-4"),
      index: 16
    },
    seventeen: {
      svg: require("./sequence/vaccine3-1.svg"),
      animation: require("./animations/vaccine3-1"),
      index: 17
    },
    eighteen: {
      svg: require("./sequence/vaccine3-2.svg"),
      animation: require("./animations/vaccine3-2"),
      index: 18
    },
    nineteen: {
      svg: require("./sequence/vaccine3-3.svg"),
      animation: require("./animations/vaccine3-3"),
      index: 19
    },
    twenty: {
      svg: require("./sequence/vaccine3-4.svg"),
      animation: require("./animations/vaccine3-4"),
      index: 20
    }
  }
};

let tl = {};
let isAnimating;
let nextAnimation;

export default props => {
  const [preload, setPreload] = useState(true);
  const [windowWidth, windowHeight] = useWindowSize();
  const [view, setView] = useState("default");
  const [animationName, setAnimationName] = useState("one");

  const svgLoaded = () => {
    tl.onfinish = undefined; // to remove callback

    if (sequences[view][animationName].animation) {
      isAnimating = true;
      tl = sequences[view][animationName].animation(window.ks);

      // Fire the animationEnded method on finish
      tl.onfinish = animationEnded;
    }
  };

  const animationEnded = () => {
    console.log("Animation ended...");
    isAnimating = false;
    // Switch to next animation (if different)
    setAnimationName(nextAnimation);

    // Only loop if on same animation
    if (animationName !== nextAnimation) return;

    // Check if loop marker is present and if so loop
    if (has(tl, "_options.markers.LoopStart")) {
      tl.play("LoopStart");
      isAnimating = true;
    } else {
      console.log("No loop");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPreload(false);
    }, 2000);
  }, []); // Load once on mount

  useEffect(() => {
    console.log(props.storyState);
    nextAnimation = props.storyState;

    if (typeof props.storyState === "undefined") return;

    if (!has(sequences, `${view}.${props.storyState}.index`)) {
      console.log("Don't have it...");

      return;
    }

    // Detect whether we are scrolling back up page
    if (
      typeof sequences[view][animationName] !== "undefined" &&
      sequences[view][props.storyState].index <
        sequences[view][animationName].index
    ) {
      console.log("Next animation is less than...");

      setAnimationName(nextAnimation);
      return;
    }

    if (!isAnimating) {
      setAnimationName(nextAnimation);
    } else {
      // It is animating
      // nextAnimation = props.storyState;
    }
  }, [props.storyState]);

  // TODO: set props.storyState to change the animationName when
  // animation reaches the end

  return (
    <div className={styles.root}>
      <div className={styles.svgContainer}>
        {sequences[view][animationName] &&
          sequences[view][animationName]["svg"] && (
            <SVG
              src={sequences[view][animationName].svg || sequences[view]["one"]}
              onLoad={svgLoaded}
              preProcessor={code => {
                // TODO: MAYBE MAKE THIS WORK OR JUST GET BEN TO PUT EVERYTHING
                // INSIDE A G ELEMENT
                // OK Ben put everything in a g el but it already had
                // a transform on it. So let's put it in another <g>
                const topGroupTag = code.replace("</defs><g", "</defs><g><g");
                const position = topGroupTag.lastIndexOf("</g>");

                const output =
                  topGroupTag.substring(0, position + 3) +
                  "</g>" +
                  topGroupTag.substring(position + 3);

                return output;
              }}
              // uniquifyIDs={true}
              // uniqueHash={"unique"}
              onError={error => {
                console.error(error);
              }}
            />
          )}
      </div>
      {preload && (
        <div className={styles.preload}>
          <SVG src={sequences[view]["one"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["two"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["three"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["four"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["five"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["six"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["seven"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["eight"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["nine"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["ten"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["eleven"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["twelve"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["thirteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["fourteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["fifteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["sixteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["seventeen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["eighteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["nineteen"].svg} uniquifyIDs={true} />
          <SVG src={sequences[view]["twenty"].svg} uniquifyIDs={true} />
        </div>
      )}
    </div>
  );
};

// const getAnimation = key => {
//   switch (props.storyState) {
//     case "one":
//       return sequences.default.one;
//     case "two":
//       return vaccine2;
//     case "three":
//       return vaccine3;
//     case "four":
//       return vaccine4;
//     case "five":
//       return vaccine5;
//     case "six":
//       return vaccine6;
//     case "seven":
//       return vaccine7;
//     case "eight":
//       return vaccine8;
//     case "nine":
//       return vaccine9;
//     case "ten":
//       return vaccine10;
//     case "eleven":
//       return vaccine11;
//     case "twelve":
//       return vaccine12;
//     default:
//       return vaccine1;
//   }
// };

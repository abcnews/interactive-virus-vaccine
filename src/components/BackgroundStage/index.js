if (KeyshapeJS.version.indexOf("1.") != 0)
  throw Error("Expected KeyshapeJS v1.*.*");
window.ks = document.ks = KeyshapeJS;

import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
// import { useWindowSize } from "@react-hook/window-size";

import styles from "./styles.scss";

// Utility to check
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
      svg: require("./sequence/vaccine1-13.svg"),
      animation: require("./animations/vaccine1-13"),
      index: 13
    },
    fourteen: {
      svg: require("./sequence/vaccine1-14.svg"),
      animation: require("./animations/vaccine1-14"),
      index: 14
    },
    fifteen: {
      svg: require("./sequence/vaccine2-1.svg"),
      animation: require("./animations/vaccine2-1"),
      index: 15
    },
    sixteen: {
      svg: require("./sequence/vaccine2-2.svg"),
      animation: require("./animations/vaccine2-2"),
      index: 16
    },
    seventeen: {
      svg: require("./sequence/vaccine2-3.svg"),
      animation: require("./animations/vaccine2-3"),
      index: 17
    },
    eighteen: {
      svg: require("./sequence/vaccine2-4.svg"),
      animation: require("./animations/vaccine2-4"),
      index: 18
    },
    nineteen: {
      svg: require("./sequence/vaccine3-1.svg"),
      animation: require("./animations/vaccine3-1"),
      index: 19
    },
    twenty: {
      svg: require("./sequence/vaccine3-2.svg"),
      animation: require("./animations/vaccine3-2"),
      index: 20
    },
    twentyone: {
      svg: require("./sequence/vaccine3-3.svg"),
      animation: require("./animations/vaccine3-3"),
      index: 21
    },
    twentytwo: {
      svg: require("./sequence/vaccine3-4.svg"),
      animation: require("./animations/vaccine3-4"),
      index: 22
    },
    twentythree: {
      svg: require("./sequence/vaccine4-1.svg"),
      animation: require("./animations/vaccine4-1"),
      index: 23
    },
    twentyfour: {
      svg: require("./sequence/vaccine4-2.svg"),
      animation: require("./animations/vaccine4-2"),
      index: 24
    },
    twentyfive: {
      svg: require("./sequence/vaccine4-3.svg"),
      animation: require("./animations/vaccine4-3"),
      index: 25
    },
    twentysix: {
      svg: require("./sequence/vaccine4-4.svg"),
      animation: require("./animations/vaccine4-4"),
      index: 25
    }
  }
};

let tl = {};
let isAnimating;
let nextAnimation;

export default props => {
  const [preload, setPreload] = useState(true);
  // const [windowWidth, windowHeight] = useWindowSize();
  const [view, setView] = useState("default");
  const [animationName, setAnimationName] = useState();

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

  const preProcessSvg = code => {
    // TODO: MAYBE MAKE THIS WORK OR JUST GET BEN TO PUT EVERYTHING
    // INSIDE A G ELEMENT
    // OK Ben put everything in a g el but it already had
    // a transform on it. So let's put it in another <g>

    const openingScriptStripped = code.replace(/<script/g, "<dummy");
    const closingScriptStripped = openingScriptStripped.replace(
      /<\/script>/g,
      "</dummy>"
    );

    const topGroupTag = closingScriptStripped.replace(
      "</defs><g",
      "</defs><g><g"
    );
    const position = topGroupTag.lastIndexOf("</g>");

    const output =
      topGroupTag.substring(0, position + 3) +
      "</g>" +
      topGroupTag.substring(position + 3);

    return output;
  };

  useEffect(() => {
    setTimeout(() => {
      setPreload(false);
    }, 5000);
  }, []); // Load once on mount

  useEffect(() => {
    if (typeof props.storyState === "undefined") return;

    console.log(props.storyState);

    nextAnimation = props.storyState.name;

    if (typeof props.storyState.name === "undefined") return;

    if (!has(sequences, `${view}.${props.storyState.name}.index`)) {
      console.log("Don't have it...");

      return;
    }

    // Detect whether we are scrolling back up page
    // and short circuit transition if so
    if (
      typeof sequences[view][animationName] !== "undefined" &&
      sequences[view][props.storyState.name].index <
        sequences[view][animationName].index
    ) {
      setAnimationName(nextAnimation);
      return;
    }

    // Immediately transition behind custom scrollout panel
    if (props.storyState.event.scrolloutbottom) {
      setAnimationName(nextAnimation);
      return;
    }

    // Transition once animation is complete
    if (!isAnimating) {
      setAnimationName(nextAnimation);
    } else {
      // It is animating
      // nextAnimation = props.storyState.name;
    }
  }, [props.storyState]);

  // TODO: set props.storyState.name to change the animationName when
  // animation reaches the end

  return (
    <div className={`${styles.root}`}>
      <div className={styles.svgContainer}>
        {sequences[view][animationName] &&
          sequences[view][animationName]["svg"] && (
            <SVG
              src={sequences[view][animationName].svg}
              onLoad={svgLoaded}
              preProcessor={preProcessSvg}
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
          <SVG
            src={sequences[view]["one"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["two"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["three"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["four"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["five"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["six"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["seven"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["eight"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["nine"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["ten"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["eleven"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twelve"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["thirteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["fourteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["fifteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["sixteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["seventeen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["eighteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["nineteen"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twenty"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twentyone"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twentytwo"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twentythree"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twentyfour"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
          <SVG
            src={sequences[view]["twentyfive"].svg}
            uniquifyIDs={true}
            preProcessor={preProcessSvg}
          />
        </div>
      )}
    </div>
  );
};

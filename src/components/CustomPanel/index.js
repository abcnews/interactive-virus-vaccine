import React, { useState, useEffect, useRef } from "react";

import styles from "./styles.scss";

// How far into the page before full opacity
const FADE_THRESHOLD = 400;

// How far to remain invisible
const FADE_OFFSET = 100;

const d3 = { ...require("d3-scale") };

const opacityScale = d3
  .scaleLinear()
  .domain([FADE_OFFSET, FADE_THRESHOLD])
  .range([0, 1])
  .clamp(true);

export default props => {
  const base = useRef();
  const [opacity, setOpacity] = useState(1.0);

  // Fade in our scrollout panels as they come into view
  const onScroll = () => {
    const windowHeight = window.innerHeight;

    // Only run on Scrollout panels
    if (!props.config.scrollout) return;

    // Get top and bottom positions of panel
    const top = base.current.getBoundingClientRect().top;
    const bottom = base.current.getBoundingClientRect().bottom;

    // If panel is off screen make it invisible and do nothing else
    if (bottom < 0 || top > windowHeight) {
      setOpacity(0.0);
      return;
    }

    // Fade in and out top if needed otherwise just make visible
    if (top < windowHeight && top > 0 && !props.config.scrolloutbottom) {
      const pixelsAboveFold = windowHeight - top;
      setOpacity(opacityScale(pixelsAboveFold));
    } else {
      setOpacity(1.0);
    }

    // NOTE: We are no longer fading the bottom of the paragraph text
    // Fade out and in bottom
    // if (bottom > 0 && bottom < windowHeight) {
    //   setOpacity(opacityScale(bottom));
    // }
  };

  // Once on mount we append Core text to the panels/pars
  useEffect(() => {
    if (!base.current) return;
    if (!props.nodes) return;

    // Tell scrollyteller that this is a panel
    props.reference(base.current);

    if (!props.config.swap) {
      const isMobile = window.innerWidth < 440;

      // Append CoreMedia nodes
      props.nodes.forEach(node => {
        // Make sure images fit inside the panels
        if (
          node.className.indexOf("ImageEmbed") > -1 ||
          node.tagName === "IMG"
        ) {
          node.style.setProperty("display", "block");
          node.style.setProperty("margin", "auto");
          node.style.setProperty(
            "width",
            isMobile ? "83.333333%" : "66.66667%"
          );
          node.style.setProperty("padding-left", "0.875rem");
          node.style.setProperty("padding-right", "0.875rem");
          if (node.hasAttribute("height")) {
            node.removeAttribute("height");
          }
        } else if (node.querySelector("img")) {
          node.style.setProperty("margin", "auto");
          node.style.setProperty(
            "width",
            isMobile ? "83.333333%" : "66.66667%"
          );
          node.style.setProperty("padding-left", "0.875rem");
          node.style.setProperty("padding-right", "0.875rem");
          [].slice.call(node.querySelectorAll("img")).forEach(img => {
            img.removeAttribute("height");
          });
        }
        base.current.appendChild(node);
      });
    }

    window.addEventListener("scroll", onScroll);

    // On unmount
    return () => {
      if (!base.current) return;
      if (!props.nodes) return;

      props.nodes.forEach(node => {
        if (base.current.contains(node)) {
          base.current.removeChild(node);
        }
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.base} ${styles.light} ${
        props.config.scrollout ? styles.scrollout : styles.right
      } ${props.config.scrollouttop ? styles.scrolloutTop : ""} ${
        props.config.scrolloutbottom ? styles.scrolloutBottom : ""
      }`}
    >
      <div className={styles.inner}>
        <div
          className={`${
            props.config.scrollout ? "custom-scrollout-panel" : ""
          } ${styles.panel}`}
          ref={base}
          style={{ opacity: opacity }}
        ></div>
      </div>
    </div>
  );
};

if (KeyshapeJS.version.indexOf('1.') != 0) throw Error('Expected KeyshapeJS v1.*.*');
window.ks = document.ks = KeyshapeJS;

import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';

import styles from './styles.scss';

// Utility to check
import { has } from 'lodash';

// Load our animation files and JavaScript animations
import sequences from './sequences';

let tl = {};
let isAnimating;
let nextAnimation;

export default props => {
  const [preload, setPreload] = useState(true);
  const [view, setView] = useState('default');
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
    isAnimating = false;
    // Switch to next animation (if different)
    setAnimationName(nextAnimation);

    // Only loop if on same animation
    if (animationName !== nextAnimation) return;

    // Check if loop marker is present and if so loop
    if (has(tl, '_options.markers.LoopStart')) {
      tl.play('LoopStart');
      isAnimating = true;
    } else {
      // No loop
    }
  };

  const preProcessSvg = code => {
    // We don't want the script running inside the SVGs
    /// so let's replace it with a dummy tag
    const openingScriptStripped = code.replace(/<script/g, '<dummy');
    const closingScriptStripped = openingScriptStripped.replace(/<\/script>/g, '</dummy>');

    // Put everything inside another g tag
    // so we can more easily position it
    let topGroupTag;

    // Hack for IE11
    const isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);

    if (isIE11 && window.innerWidth > 1023) {
      topGroupTag = closingScriptStripped.replace(
        '</defs><g',
        `</defs><g transform="translate(-${window.innerWidth * 0.2},0)"><g`
      );
    } else {
      topGroupTag = closingScriptStripped.replace('</defs><g', `</defs><g><g`);
    }

    const position = topGroupTag.lastIndexOf('</g>');

    const lastGroupTag = topGroupTag.substring(0, position + 3) + '</g>' + topGroupTag.substring(position + 3);

    // If we are on Desktop tweak font size
    const output = window.innerWidth > 900 ? lastGroupTag.replace(/font-size="18"/g, 'font-size="15"') : lastGroupTag;

    return output;
  };

  useEffect(() => {
    // TODO: maybe find a better way
    // but this seems to work pretty well for now
    setTimeout(() => {
      setPreload(false);
    }, 3000);

    // Start the background out as hidden
    // so it doesn't go over the body text
    // const backgroundStage = document.querySelector(
    //   "div[data-interactive-scrollout-root] > div > div.sgMpdhCf"
    // );

    // // Start off invisible so we don't have to wait
    // // for Custom panel scroll
    // backgroundStage.style.visibility = "hidden";

    // IE11 doesn't translate vw so let's hack a solution
    // NO WAIT THIS WON'T WORK BECAUSE SVG NOT ON THERE INITIALLY
    // const isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);

    // if (isIE11 && window.innerWidth > 1023) {
    //   const container = document.querySelector(`.${styles.svgContainer} svg > g`);

    //   container.style.transform = `translateX(${window.innerWidth * 0.2}px)`;
    // }
  }, []); // Load once on mount

  useEffect(() => {
    if (typeof props.storyState === 'undefined') return;

    nextAnimation = props.storyState.name;

    if (typeof props.storyState.name === 'undefined') return;

    if (!has(sequences, `${view}.${props.storyState.name}.index`)) {
      // Animation not defined
      return;
    }

    // Detect whether we are scrolling back up page
    // and short circuit transition if so
    if (
      typeof sequences[view][animationName] !== 'undefined' &&
      sequences[view][props.storyState.name].index < sequences[view][animationName].index
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

  return (
    <>
      {props.showStage && (
        <div className={`${styles.root}`}>
          <div className={styles.svgContainer}>
            {sequences[view][animationName] && sequences[view][animationName]['svg'] && (
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
        </div>
      )}
      {preload && (
        <div className={styles.preload}>
          <SVG src={sequences[view]['one'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['two'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['three'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['four'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['five'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['six'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['seven'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['eight'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['nine'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['ten'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['eleven'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twelve'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['thirteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['fourteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['fifteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['sixteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['seventeen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['eighteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['nineteen'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twenty'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentyone'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentytwo'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentythree'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentyfour'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentyfive'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
          <SVG src={sequences[view]['twentysix'].svg} uniquifyIDs={true} preProcessor={preProcessSvg} />
        </div>
      )}
    </>
  );
};

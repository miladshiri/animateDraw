import React from 'react';
import styles from './Astronaut.module.css';
import { defaultSettings } from "../shapeToComponentMapping";

const Astronaut = ({ size, shapeSettings }) => {
  const speedClass = shapeSettings?.animationSpeed === "slow" ? styles.slow : 
                    shapeSettings?.animationSpeed === "fast" ? styles.fast : 
                    styles.normal;

  // Calculate separate scales for width and height
  const scaleX = size.w / 500;
  const scaleY = size.h / 500;

  // Get color from settings or use default
  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Astronaut'].shapeColor;
  const borderColor = shapeSettings?.borderColor || defaultSettings['Astronaut'].borderColor;

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        top: `0px`,
        left: `0px`,
        width: `100%`,
        height: `100%`,
        userSelect: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className={styles.backg} style={{ 
        transform: `scale(${scaleX}, ${scaleY})`,
        margin: '0 auto'
      }}>
        <div className={styles.planet} style={{ backgroundColor: borderColor }}>
          <div className={styles.r1}></div>
          <div className={styles.r2}></div>
          <div className={styles.r3}></div>
          <div className={styles.r4}></div>
          <div className={styles.r5}></div>
          <div className={styles.r6}></div>
          <div className={styles.r7}></div>
          <div className={styles.r8}></div>
          <div className={styles.shad}></div>
        </div>
        <div className={styles.stars}>
          <div className={styles.s1}></div>
          <div className={styles.s2}></div>
          <div className={styles.s3}></div>
          <div className={styles.s4}></div>
          <div className={styles.s5}></div>
          <div className={styles.s6}></div>
        </div>
        <div className={`${styles.an} ${speedClass}`}>
          <div className={styles.tank}></div>
          <div className={styles.astro}>
            <div className={styles.helmet} style={{ backgroundColor: shapeColor }}>
              <div className={styles.glass}>
                <div className={styles.shine}></div>
              </div>
            </div>
            <div className={styles.dress} style={{ backgroundColor: shapeColor }}>
              <div className={styles.c}>
                <div className={styles.btn1}></div>
                <div className={styles.btn2}></div>
                <div className={styles.btn3}></div>
                <div className={styles.btn4}></div>
              </div>
            </div>
            <div className={styles.handl} style={{ backgroundColor: shapeColor }}>
              <div className={styles.handl1}>
                <div className={styles.glovel}>
                  <div className={styles.thumbl}></div>
                  <div className={styles.b2}></div>
                </div>
              </div>
            </div>
            <div className={styles.handr} style={{ backgroundColor: shapeColor }}>
              <div className={styles.handr1}>
                <div className={styles.glover}>
                  <div className={styles.thumbr}></div>
                  <div className={styles.b1}></div>
                </div>
              </div>
            </div>
            <div className={styles.legl} style={{ backgroundColor: shapeColor }}>
              <div className={styles.bootl1}>
                <div className={styles.bootl2}></div>
              </div>
            </div>
            <div className={styles.legr} style={{ backgroundColor: shapeColor }}>
              <div className={styles.bootr1}>
                <div className={styles.bootr2}></div>
              </div>
            </div>
            <div className={styles.pipe}>
              <div className={styles.pipe2}>
                <div className={styles.pipe3}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Astronaut; 
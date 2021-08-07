import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import background from "./images/backgroundResult.png";
import Bar from "./Bar";
import Chart from "./Chart";
import ReactAudioPlayer from "react-audio-player";
import noisyAudio from "./audio/cropped_noisy.ogg";
import refinedAudio from "./audio/good.ogg";
import trueAudio from "./audio/target_true.ogg";

import { Link } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "4rem",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "Raleway",
    zIndex: "-1",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#FFA114",
  },
  score: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  color: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#FFA114",
    marginBottom: "3rem",
  },
  mainMenu: {
    width: "13rem",
    height: "4rem",
    background: "linear-gradient(#FFC267, #FFBD5A)",
    border: "none",
    fontSize: "1.25rem",
    borderRadius: ".5rem",
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  chart: {
    marginTop: "3rem",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  chartTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  header: {
    marginBottom: "1rem",
  },
  detectedText: {
    color: "black",
    fontSize: "1.2rem",
    width: "50vw",
    textAlign: "justify",
    fontWeight: 400,
  },
  audioPlayer: {
    borderRadius: "15px",
    backgroundColor: "azure",
    filter: "brightness(120%)",
  },
  main: {
    display: "flex",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    top: "90vh",
    fontSize: "1rem",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
});

export const Result = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.background}>
        <div className={classes.container}>
          <div className={classes.scoreContainer}>
            <div className={classes.title}>AudioTech Refiner</div>
          </div>
          <br />
          <div className={classes.main}>
            <div className={classes.color}>
              <div className={classes.header}>True Audio</div>
              <ReactAudioPlayer
                src={trueAudio}
                controls
                className={classes.audioPlayer}
              />
            </div>
            <div className={classes.color}>
              <div className={classes.header}>Noisy Audio</div>
              <ReactAudioPlayer
                src={noisyAudio}
                controls
                className={classes.audioPlayer}
              />
            </div>
            <div className={classes.color}>
              <div className={classes.header}>Refined Audio</div>
              <ReactAudioPlayer
                src={refinedAudio}
                controls
                className={classes.audioPlayer}
              />
            </div>
            <div className={classes.color}>
              <div className={classes.header}>Detected Text</div>
              <div className={classes.detectedText}>
                Rachel Lynde lived just where the Avonlea main road dipped down
                into a little hollow fringed with alders and ladies, eardrops
                and traversed by a brook.
              </div>
            </div>
            <Link to="/" exact="true">
              <div>
                <input
                  type="button"
                  className={classes.mainMenu}
                  value="MAIN MENU"
                ></input>
              </div>
            </Link>
            <div className={classes.footer}>
              <footer>
                {" "}
                Made by Team AudioTech for the Innovation Fair of UTADA{" "}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const GenuineResult = ({ numbers, interval, average, video }) => {
  const classes = useStyle();
  const score = average;
  const displayedScore = Math.floor(score * 100);
  const videoRef = useRef(null);
  let props = { score };

  function handleClick(x, y) {
    if (isFinite(x)) {
      debugger;
      videoRef.current.currentTime = x;
    }
  }

  return (
    <>
      <div className={classes.background}>
        <div className={classes.container}>
          <div className={classes.scoreContainer}>
            <div className={classes.finalScore}>FINAL SCORE</div>
            <div className={classes.score}>{displayedScore}%</div>
            <div>
              <Bar {...props}></Bar>
            </div>
          </div>
          <div className={classes.chart}>
            <div className={classes.chartTitle}>Attention Span over Time</div>
            <Chart
              numbers={numbers}
              interval={interval}
              handleClick={handleClick}
            ></Chart>
          </div>
          <video width="400" controls ref={videoRef}>
            <source src={URL.createObjectURL(video)}></source>
          </video>
          <Link to="/" exact="true">
            <div>
              <input
                type="button"
                className={classes.mainMenu}
                value="MAIN MENU"
              ></input>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Result;

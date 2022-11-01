import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAmbulance,
  faAnchor,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const Sound = () => {
  const [playMusic, setPlayMusic] = useState<boolean>(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("Sounds/background-music.mp3")
  );

  useEffect(() => {
    handlePlayBackgroundMusic();
  }, [playMusic]);

  function handlePlayBackgroundMusic(): void {
    if (audio) {
      audio.volume = 0.3;
      if (playMusic) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        top: 20,
        color: "#fff",
        fontSize: 20,
      }}
      onClick={() => setPlayMusic((prev) => !prev)}
    >
      <FontAwesomeIcon
        icon={playMusic ? faVolumeHigh : faVolumeMute}
        style={{ fontSize: 60, color: "#fff" }}
      />
    </div>
  );
};

export default Sound;

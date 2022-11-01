import React, { useState, useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import styled from "@emotion/styled";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
config.autoAddCss = false;

const SoundBox = styled.div(() => ({
  position: "absolute",
  right: 20,
  top: 20,
  color: "#fff",
  fontSize: 20,
  zIndex: "9999999",
}));

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
    <SoundBox onClick={() => setPlayMusic((prev) => !prev)}>
      <FontAwesomeIcon
        icon={playMusic ? faVolumeHigh : faVolumeMute}
        style={{ fontSize: 60, color: "#fff" }}
      />
    </SoundBox>
  );
};

export default Sound;

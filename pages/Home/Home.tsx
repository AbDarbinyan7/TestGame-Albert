import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import AscDesc from "../../components/AscDescContainer/AscDescContainer";
import StartGameButton from "../../components/StartGameButton/StartGameButton";
import MainGameBoard from "../../components/Game";

import { countMarks, valueMarks } from "../../HomeData";
import {
  CountContext,
  ValueContext,
  DirectionContext,
  GameStartedContext,
} from "../../Context";

import "rsuite/dist/rsuite.min.css";

const Container = styled.div({
  backgroundImage: `url(/Images/1.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "91px 0",
});

const GameControls = styled.div({
  backgroundImage: `url(/Images/2.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "700px",
  height: "660px",
  color: "#423F45",
  textAlign: "center",
  fontSize: "32px",
  fontFamily: "Helvetica",
  padding: "57px 0",
  lineHeight: "44px",
  fontWeight: "600",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

export interface SingleMark {
  value: number;
  label: string;
  type: number;
}

const Home: React.FC = () => {
  const { selectedCount, setSelectedCount } = useContext<any>(CountContext);
  const { selectedValue, setSelectedValue } = useContext<any>(ValueContext);
  const { selectedDirection, setSelectedDirection } =
    useContext<any>(DirectionContext);
  const { gameStarted, setGameStarted } = useContext<any>(GameStartedContext);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("Sounds/woof-sound.mp3")
  );

  function valueLabelFormat(value: number) {
    return valueMarks.findIndex((mark: SingleMark) => mark.value === value) + 1;
  }

  function handleFindValue(val: number | number[]) {
    let selectedVal: SingleMark | undefined = valueMarks.find(
      (mark: SingleMark) => mark.value === val
    );
    handlePlaySliderMoveAudio();
    setSelectedValue(selectedVal);
  }

  function handleStartGame(): void {
    setGameStarted(true);
  }

  function handlePlaySliderMoveAudio(): void {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio?.play();
    }
  }

  if (gameStarted) {
    return <MainGameBoard />;
  }

  return (
    <Container>
      <GameControls>
        <Box>
          <Box
            sx={{
              display: "grid",
              gridGap: 36,
            }}
          >
            <p>Кол-во предметов</p>
            <Box sx={{ width: 366, margin: "0 auto" }}>
              <Slider
                onChange={(event, value, thumb) => {
                  handlePlaySliderMoveAudio();
                  setSelectedCount(value);
                }}
                aria-label="Small steps"
                defaultValue={2}
                step={1}
                marks={countMarks}
                min={2}
                max={5}
                valueLabelFormat={valueLabelFormat}
                valueLabelDisplay="off"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridGap: 36,
            }}
          >
            <p>Зачения</p>
            <Box sx={{ width: 531 }}>
              <Slider
                onChange={(event, value, thumb) => handleFindValue(value)}
                aria-label="Custum s  teps"
                defaultValue={1}
                step={1}
                min={1}
                max={6}
                marks={valueMarks}
                valueLabelDisplay="off"
              />
            </Box>
          </Box>
          <AscDesc
            onClick={(direction: string) => {
              handlePlaySliderMoveAudio();
              setSelectedDirection(direction);
            }}
            selectedDirection={selectedDirection}
          />
        </Box>

        <StartGameButton onClick={handleStartGame} text="Играть" />
      </GameControls>
    </Container>
  );
};

export default Home;

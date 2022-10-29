import React, { useState } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import AscDesc, {
  DIRECTIONS,
} from "../../components/AscDescContainer/AscDescContainer";
import { countMarks, valueMarks } from "./HomeData";
import StartGameButton from "../../components/StartGameButton/StartGameButton";

import "rsuite/dist/rsuite.min.css";

const HomeContainer = styled.div({
  backgroundImage: `url(/Images/1.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
}

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<SingleMark | undefined>(
    undefined
  );
  const [selectedCount, setSelectedCount] = useState<number | number[]>(1);
  const [direction, setDirection] = useState<string>(DIRECTIONS.ASC);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: number) {
    return valueMarks.findIndex((mark) => mark.value === value) + 1;
  }

  function handleFindValue(val: number | number[]) {
    let selectedVal: SingleMark | undefined = valueMarks.find(
      (mark: SingleMark) => mark.value === val
    );

    setSelectedValue(selectedVal);
  }

  function handleStartGame() {}

  return (
    <HomeContainer>
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
                onChange={(event, value, thumb) => setSelectedCount(value)}
                aria-label="Small steps"
                defaultValue={1}
                step={1}
                getAriaValueText={valuetext}
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
          <AscDesc onClick={setDirection} selected={direction} />
        </Box>

        <StartGameButton onClick={handleStartGame} />
      </GameControls>
    </HomeContainer>
  );
};

export default Home;

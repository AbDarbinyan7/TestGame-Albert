import React, { useState } from "react";
import type { AppProps } from "next/app";

import {
  CountContext,
  ValueContext,
  DirectionContext,
  GameStartedContext,
} from "../Context";
import { valueMarks } from "./Home/HomeData";
import Sound from "../components/Sound/Sound";
import { DIRECTIONS } from "../components/AscDescContainer/AscDescContainer";
import { SingleMark } from "./Home/Home";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedCount, setSelectedCount] = useState<number>(2);
  const [selectedValue, setSelectedValue] = useState<SingleMark>(valueMarks[0]);
  const [selectedDirection, setSelectedDirection] = useState<string>(
    DIRECTIONS.ASC
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Sound />
      <CountContext.Provider value={{ selectedCount, setSelectedCount }}>
        <ValueContext.Provider value={{ selectedValue, setSelectedValue }}>
          <DirectionContext.Provider
            value={{ selectedDirection, setSelectedDirection }}
          >
            <GameStartedContext.Provider
              value={{ gameStarted, setGameStarted }}
            >
              <Component {...pageProps} />
            </GameStartedContext.Provider>
          </DirectionContext.Provider>
        </ValueContext.Provider>
      </CountContext.Provider>
    </React.Fragment>
  );
}

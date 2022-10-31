import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import { CountContext, ValueContext, DirectionContext } from "../Context";
import { valueMarks } from "./Home/HomeData";

import "../styles/globals.css";
import { DIRECTIONS } from "../components/AscDescContainer/AscDescContainer";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedCount, setSelectedCount] = useState<any>(5);
  const [selectedValue, setSelectedValue] = useState<any>(valueMarks[2]);
  const [selectedDirection, setSelectedDirection] = useState<any>(
    DIRECTIONS.ASC
  );

  return (
    
      <CountContext.Provider value={{ selectedCount, setSelectedCount }}>
        <ValueContext.Provider value={{ selectedValue, setSelectedValue }}>
          <DirectionContext.Provider
            value={{ selectedDirection, setSelectedDirection }}
          >
            <Component {...pageProps} />
          </DirectionContext.Provider>
        </ValueContext.Provider>
      </CountContext.Provider>
   
  );
}

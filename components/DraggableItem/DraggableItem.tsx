import type { CSSProperties } from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { memo } from "react";
import { useDrag } from "react-dnd";

import { SingleThemeInterface, SingleBoardInterface } from "../Game/index";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

interface BoxInterface {
  selectedTheme: any;
  isDropped: any;
  i: number;
}

const Wrapper = styled.div(() => ({
  position: "relative",

  [`.flowers-theme-branch-1`]: {
    top: "83%",
    left: "114%",
  },
  [`.flowers-theme-branch-2`]: {
    top: "78%",
    left: "78%",
  },
  [`.flowers-theme-branch-3`]: {
    top: "70%",
    left: "67%",
  },
  [`.flowers-theme-branch-4`]: {
    top: "82%",
    left: "50%",
  },
  [`.flowers-theme-branch-5`]: {
    top: "82%",
    left: "-12%",
  },
  [`.christmas-theme-branch`]: {
    top: "-22px",
    left: "53%",
  },
}));

const DraggableBox = styled.div((props: BoxInterface) => ({
  backgroundImage: props.isDropped
    ? "initial"
    : `url(/Images/${props.selectedTheme?.folderName}/Icon${props.i + 1}.png)`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  transform: "translate(0,0)",
  cursor: !props.isDropped ? "grab" : "initial",
  position: "relative",
}));

const DraggableItem = memo(function Box({
  type = "",
  i,
  selectedTheme,
  board,
  isDropped,
}: any) {
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("Sounds/fail-sound.mp3")
  );

  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: board,
      collect: (monitor) => {
        return {
          opacity: monitor.isDragging() ? 0 : 1,
        };
      },
    }),
    [board, type]
  );

  function dragStartHendler(e: any, boardData: SingleBoardInterface) {
    let audio = new Audio("Sounds/grab-sound.mp3");
    audio.play();
  }

  function dragEndHendler(e: any, board: SingleBoardInterface) {
    if (!isDropped) {
      handlePlaySliderMoveAudio();
    }
  }

  function dropHandler(e: any) {
    e.preventDefault();
  }

  function handlePlaySliderMoveAudio(): void {
    if (audio) {
      audio.pause();
      audio.volume = 0.4;
      audio.currentTime = 0;
      audio?.play();
    }
  }

  return (
    <Wrapper
      style={{
        position: "relative",
      }}
      className={`item-container item-container-${i + 1}`}
    >
      <DraggableBox
        ref={!isDropped ? drag : null}
        data-testid="box"
        draggable={true}
        onDragStart={(e) => dragStartHendler(e, board)}
        onDragEnd={(e) => dragEndHendler(e, board)}
        onDrop={(e) => dropHandler(e)}
        className={`item item-${i + 1}`}
        key={i.toString()}
        selectedTheme={selectedTheme}
        isDropped={isDropped}
        i={i}
        style={{
          opacity,
        }}
      >
        {!isDropped && <h1>{board.value}</h1>}
      </DraggableBox>
      {selectedTheme.name === "flowers-theme" ||
      selectedTheme.name === "christmas-theme" ? (
        <img
          className={`${selectedTheme.name}-branch ${
            selectedTheme.name
          }-branch-${i + 1}`}
          style={{
            position: "absolute",
            transform: "translateX(-50%)",
          }}
          src={`/Images/${selectedTheme.folderName}/branch${i + 1}.png`}
          alt=""
        ></img>
      ) : (
        ""
      )}
    </Wrapper>
  );
});

export default DraggableItem;

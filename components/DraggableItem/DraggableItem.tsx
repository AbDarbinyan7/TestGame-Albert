import type { CSSProperties } from "react";
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
  boards,
  board,
  isDropped,
}: any) {
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
  console.log(board, "board");

  function dragOverHandler(
    e: any,
    boards: SingleBoardInterface[],
    boardData: SingleBoardInterface
  ) {
    e.preventDefault();
  }

  function dragLeaveHandler(e: any) {}

  function dragStartHendler(e: any, boardData: SingleBoardInterface) {
    let audio = new Audio("Sounds/grab-sound.mp3");
    audio.play();
  }

  function dragEndHendler(e: any) {
    console.log("here i am");
  }

  function dropHandler(
    e: any,
    boards: SingleBoardInterface[],
    boardData: SingleBoardInterface
  ) {
    e.preventDefault();
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
        onDragEnd={(e) => dragEndHendler(e)}
        onDrop={(e) => dropHandler(e, boards, board)}
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

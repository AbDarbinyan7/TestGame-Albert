import type { CSSProperties } from "react";
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

interface DraggableItemInterface {
  selectedTheme: SingleThemeInterface | undefined;
  i: number;
  board: SingleBoardInterface;
  boards: SingleBoardInterface[];
}

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

  function dragEndHendler(e: any) {}

  function dropHandler(
    e: any,
    boards: SingleBoardInterface[],
    boardData: SingleBoardInterface
  ) {
    e.preventDefault();
  }

  return (
    <div
      ref={!isDropped ? drag : null}
      data-testid="box"
      draggable={true}
      onDragStart={(e) => dragStartHendler(e, board)}
      onDragEnd={(e) => dragEndHendler(e)}
      onDrop={(e) => dropHandler(e, boards, board)}
      style={{
        backgroundImage: isDropped
          ? "initial"
          : `url(/Images/${selectedTheme?.folderName}/Icon${i + 1}.png)`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        transform: "translate(0,0)",
        cursor: !isDropped ? "grab" : "initial",
        opacity,
      }}
      className={`item item-${i + 1}`}
      key={i.toString()}
    >
      {!isDropped && <h1>{board.value}</h1>}
    </div>
  );
});

export default DraggableItem;

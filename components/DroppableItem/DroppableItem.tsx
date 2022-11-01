import { memo } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";
import { SingleBoardInterface, SingleThemeInterface } from "../Game";

interface DropBoxInterface {
  isActive: boolean;
  selectedTheme: SingleThemeInterface;
  item: SingleBoardInterface;
}

const DropBox = styled.div((props: DropBoxInterface) => ({
  width: 131,
  height: 131,
  overflow: "hidden",
  backgroundColor: props.isActive ? "lightgreen" : "initial",
  backgroundImage: props.item.isDropped
    ? `url(/Images/${props.selectedTheme?.folderName}/Icon${
        props.item.id + 1
      }.png)`
    : "initial",
  backgroundSize: "90%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  transform: "translate(0,0)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DroppableItem = memo(function DroppableItem({
  accept = [],
  onDrop,
  item,
  selectedTheme,
}: any) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "transparent";
  let borderRadius = "initial";

  if (isActive) {
    backgroundColor = "lightgreen";
    borderRadius = "50%";
  }

  return (
    <DropBox
      isActive={isActive}
      selectedTheme={selectedTheme}
      item={item}
      ref={drop}
      style={{
        borderRadius,
      }}
    >
      {item.isDropped && (
        <h1
          style={{
            fontSize: 56,
            color: "#fff",
            textShadow:
              " 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
          }}
        >
          {item.value}
        </h1>
      )}
    </DropBox>
  );
});

export default DroppableItem;

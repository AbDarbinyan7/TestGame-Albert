import { memo } from "react";
import { useDrop } from "react-dnd";

interface DroppableItemInterface {}

const DroppableItem = memo(function DroppableItem({
  accept = [],
  lastDroppedItem,
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
    backgroundColor = "gray";
    borderRadius = "50%";
  }
  // else if (canDrop) {
  //   backgroundColor = "darkkhaki";
  // }

  {
    /* {isActive
        ? "Release to drop"
        : `This dustbin accepts: ${accept.join(", ")}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )} */
  }

  return (
    <div
      ref={drop}
      // ref={(drop) => (itemsRef.current[i] = drop)}
      className={`gago`}
      onDragOver={(e) => {}}
      onDragLeave={(e) => {}}
      onDragStart={(e) => {}}
      onDragEnd={(e) => {}}
      onDrop={(e) => {}}
      style={{
        width: 131,
        height: 131,
        overflow: "hidden",
        backgroundColor,
        backgroundImage: item.isDropped
          ? `url(/Images/${selectedTheme?.folderName}/Icon${item.id + 1}.png)`
          : "initial",
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        transform: "translate(0,0)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          {item.number}
        </h1>
      )}
    </div>
  );
});

export default DroppableItem;

import styled from "@emotion/styled";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useDrop } from "react-dnd";
import { CountContext, DirectionContext, ValueContext } from "../../Context";
import { DIRECTIONS } from "../../components/AscDescContainer/AscDescContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggablItem from "../../components/DraggableItem/DraggableItem";
import DroppableItem from "../../components/DroppableItem/DroppableItem";
import Example from "./example";

interface SelectedThemeInterface {
  [key: string]: SingleThemeInterface;
}

export interface SingleThemeInterface {
  name: string;
  backgroundColor: string;
  folderName: string;
}

const GAME_THEMES: SelectedThemeInterface = {
  theme1: {
    name: "cakes-theme",
    backgroundColor: "#dec6aa",
    folderName: "CakesTheme",
  },
  theme2: {
    name: "coins-theme",
    backgroundColor: "#3a1f36",
    folderName: "CoinsTheme",
  },
  theme3: {
    name: "christmas-theme",
    backgroundColor: "#132738",
    folderName: "ChristmasTheme",
  },
  theme4: {
    name: "flowers-theme",
    backgroundColor: "#2d3539",
    folderName: "FlowersTheme",
  },
};

interface ContainerStylesInterface {
  backgroundColor: string;
}

const Container = styled.div((props: ContainerStylesInterface) => ({
  backgroundRepeat: "no-repeat, no-repeat",
  backgroundPosition: "top left, top right",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: props.backgroundColor,
  position: "relative",
  [`&.cakes-theme`]: {
    backgroundImage:
      "url(/Images/CakesTheme/Group.png), url(/Images/CakesTheme/Group2.png)",
  },
  [`&.coins-theme`]: {
    backgroundImage:
      "url(/Images/CoinsTheme/Group.png), url(/Images/CoinsTheme/Group5.png)",
  },
  [`&.christmas-theme`]: {
    backgroundImage:
      "url(/Images/ChristmasTheme/Group1.png), url(/Images/ChristmasTheme/Group.png), url(/Images/ChristmasTheme/Group2.png),url(/Images/ChristmasTheme/Group3.png)",
    backgroundPosition: "bottom left, bottom right, top left, top right ",
  },
  [`&.flowers-theme`]: {
    backgroundImage:
      "url(/Images/FlowersTheme/Group1.png), url(/Images/FlowersTheme/Group.png), url(/Images/FlowersTheme/Group2.png),url(/Images/FlowersTheme/Group3.png)",
    backgroundPosition: "bottom left, top left, top right, bottom right ",
  },
}));

const Bord = styled.div(() => ({
  backgroundRepeat: "no-repeat",
  minWidth: "886px",
  height: "222px",
  margin: "0 auto 30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  backgroundSize: " 100%",
  position: "relative",

  [`&.cakes-theme`]: {
    backgroundImage:
      "url(/Images/CakesTheme/DeckBg.png), url(/Images/CakesTheme/Rectangle899.png) ",
  },
  [`&.coins-theme`]: {
    backgroundImage: "url(/Images/CoinsTheme/DeckBg.png)",
  },
  [`&.christmas-theme`]: {
    backgroundImage:
      "url(/Images/ChristmasTheme/DeckBg.png), url(/Images/ChristmasTheme/DeckColor.png)",
  },
  [`&.flowers-theme`]: {
    backgroundImage: "url(/Images/FlowersTheme/DeckBg.png)",
  },
}));

const AscDescBox = styled.div((props: any) => ({
  width: "357px",
  height: "68px",
  backgroundImage: "url(/Images/Arrow.png)",
  backgroundSize: "100%",
  position: "absolute",
  top: "-80px",
  color: "#FFF",
  fontSize: "36px",
  fontFamily: "Calibri",
  display: "flex",
  alignItems: "center",
  textShadow:
    " 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
  [`> p`]: {
    margin: 0,
    marginBottom: 7,
  },
  [`&.left`]: {
    left: 0,
  },
  [`&.right`]: {
    right: 0,
    justifyContent: "flex-end",
    backgroundImage: "url(/Images/ArrowRight.png)",
    [`> p`]: {
      margin: 0,
      marginBottom: 3,
    },
  },
}));

const NumbersBoxContainer = styled.div((props: any) => ({
  display: "flex",
  alignItems: "center",
  gap: "0",
  margin: "auto",
  background: "transparent",

  [`> .item`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Calibri",
    width: 156,
    height: 156,
    cursor: "pointer",
    background: props.itemImage,

    [`> h1`]: {
      fontSize: 56,
      textShadow:
        " 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
    },
  },
  [`> .item-1`]: {
    marginBottom: 70,
    marginRight: 60,
  },
  [`> .item-2`]: {
    marginBottom: 170,
  },
  [`> .item-3`]: {
    marginTop: 70,
  },
  [`> .item-4`]: {
    marginBottom: 170,
  },
  [`> .item-5`]: {
    marginBottom: 20,
    marginLeft: 70,
  },
}));

export interface SingleBoardInterface {
  board: number;
  id: number;
  number: number;
  isDropped?: boolean;
}

const Game: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<
    SingleThemeInterface | undefined
  >(undefined);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [boards, setBoards] = useState<SingleBoardInterface[]>([]);
  const [droppedBoards, setDroppedBoards] = useState<SingleBoardInterface[]>(
    []
  );

  const { selectedCount, setSelectedCount } = useContext<any>(CountContext);
  const { selectedValue, setSelectedValue } = useContext<any>(ValueContext);
  const { selectedDirection, setSelectedDirection } =
    useContext<any>(DirectionContext);
  // const [{ isOver }, collectedProps, drop]: any = useDrop(() => ({
  //   accept: "image",
  // }));
  // console.log(collectedProps, " collectedProps");

  const itemsRef = useRef<any>([]);

  useEffect(() => {
    if (droppedBoards.length) {
      isGameOver();
    }
  }, [droppedBoards]);

  useEffect(() => {
    handleFindTheme();
  }, []);

  const isGameOver = () => {
    const hasUnCompletedBoard = droppedBoards.find((b) => !b.isDropped);

    if (!hasUnCompletedBoard) {
      alert("Won");
    }
  };

  useEffect(() => {
    let newArr: any = [];
    if (selectedCount) {
      if (selectedValue.type !== 0) {
        for (let i = 0; i < selectedCount; i++) {
          let newValue = onGenerateBoard(newArr, i);
          newArr.push(newValue);
        }
      }
    }
    setBoards(newArr);

    let arrayForDroppedBoards = newArr.map((arr: SingleBoardInterface) => {
      return {
        ...arr,
        isDropped: false,
      };
    });

    function compare(a: any, b: any) {
      if (selectedDirection === DIRECTIONS.ASC) {
        if (a.number < b.number) {
          return -1;
        }
        if (a.number > b.number) {
          return 1;
        }
      }
      if (selectedDirection === DIRECTIONS.DESC) {
        if (a.number > b.number) {
          return -1;
        }
        if (a.number < b.number) {
          return 1;
        }
      }

      return 0;
    }

    arrayForDroppedBoards = arrayForDroppedBoards.sort(compare);

    setDroppedBoards(arrayForDroppedBoards);
  }, []);

  function onGenerateBoard(arr: any, i: number) {
    let newObj: SingleBoardInterface | null = null;
    onCheckHaveDublicate();

    function onCheckHaveDublicate(): void {
      let RandomNumber = generateRandomNumber(selectedValue.label);
      let hasDublicate = arr.find((el: any) => el.number === RandomNumber);
      if (hasDublicate) {
        onCheckHaveDublicate();
        return;
      }

      newObj = {
        board: i,
        id: i,
        number: RandomNumber,
      };
    }
    return newObj;
  }

  function generateRandomNumber(num: string) {
    return Math.floor(Math.random() * +num) + 1;
  }

  function handleFindTheme() {
    const RandomInitial: number = Math.floor(Math.random() * 4) + 1;
    setSelectedTheme(GAME_THEMES[`theme${RandomInitial}`]);
    // setSelectedTheme(GAME_THEMES[`theme1`]);
  }

  const handleDrop = useCallback(
    (index: any, item: any, droppedBoards: SingleBoardInterface[]) => {
      const newDroppedBoards = droppedBoards.map((board) => {
        if (board.id === item.id) {
          board.isDropped = true;
        }
        return board;
      });

      setDroppedBoards(newDroppedBoards);

      // const { name } = item;
      // setDroppedBoxNames(
      //   update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      // );
      // setDustbins(
      //   update(dustbins, {
      //     [index]: {
      //       lastDroppedItem: {
      //         $set: item,
      //       },
      //     },
      //   })
      // );
    },
    []
    // [droppedBoxNames, dustbins]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        backgroundColor={selectedTheme?.backgroundColor || "#fff"}
        className={selectedTheme?.name}
      >
        {/* <Example /> */}
        <NumbersBoxContainer>
          {boards.map((board, index) => {
            const currentDroppedBoard = droppedBoards.find(
              (b) => b.id === board.id
            );
            console.log(currentDroppedBoard, " currentDroppedBoard");

            return (
              <DraggablItem
                key={index.toString()}
                type={board.number.toString()}
                i={index}
                selectedTheme={selectedTheme}
                boards={boards}
                board={board}
                isDropped={currentDroppedBoard?.isDropped}
              />
            );
          })}
        </NumbersBoxContainer>
        <Bord className={selectedTheme?.name}>
          <AscDescBox
            className={selectedDirection === DIRECTIONS.DESC ? "right" : "left"}
          >
            <p>
              {selectedDirection === DIRECTIONS.ASC
                ? "По возрастанию"
                : "По убыванию"}
            </p>
          </AscDescBox>
          {boards.map((board, i) => (
            <div
              key={i.toString()}
              style={{
                width: 131,
                height: 131,
                borderRadius: "50%",
                boxShadow: "inset 0px 0px 25px rgba(0,0,0,0.5)",
                overflow: "hidden",
              }}
            ></div>
          ))}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: "flex",
              gap: 5,
              alignItems: "center",
            }}
            // ref={drop}
          >
            {droppedBoards.map((board, i) => (
              <DroppableItem
                accept={[board.number.toString()]}
                key={i.toString()}
                onDrop={(item: any) => handleDrop(i, item, droppedBoards)}
                item={board}
                selectedTheme={selectedTheme}
              />
            ))}
          </div>
        </Bord>
      </Container>
    </DndProvider>
  );
};

export default Game;

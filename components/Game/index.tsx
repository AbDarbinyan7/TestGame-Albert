import styled from "@emotion/styled";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { CountContext, DirectionContext, ValueContext } from "../../Context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DIRECTIONS } from "../../components/AscDescContainer/AscDescContainer";
import DraggablItem from "../../components/DraggableItem/DraggableItem";
import DroppableItem from "../../components/DroppableItem/DroppableItem";
import WinGame from "../WinGame/WinGame";

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

  [`.item`]: {
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
  [`.item-container-1`]: {
    marginBottom: 70,
    marginRight: 60,
  },
  [`.item-container-2`]: {
    marginBottom: 170,
  },
  [`.item-container-3`]: {
    marginTop: 70,
  },
  [`.item-container-4`]: {
    marginBottom: 170,
  },
  [`.item-container-5`]: {
    marginBottom: 20,
    marginLeft: 70,
  },
}));

export interface SingleBoardInterface {
  id: number;
  value: number | string;
  isDropped?: boolean;
}

const Game: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<
    SingleThemeInterface | undefined
  >(undefined);
  const [boards, setBoards] = useState<SingleBoardInterface[]>([]);
  const [droppedBoards, setDroppedBoards] = useState<SingleBoardInterface[]>(
    []
  );
  const [IsWinGame, setIsWinGame] = useState<boolean>(false);

  const { selectedCount, setSelectedCount } = useContext<any>(CountContext);
  const { selectedValue, setSelectedValue } = useContext<any>(ValueContext);
  const { selectedDirection, setSelectedDirection } =
    useContext<any>(DirectionContext);
  const [successAudio] = useState(
    typeof Audio !== "undefined" && new Audio("Sounds/success-sound.mp3")
  );

  const Ruletters = "????????????????????????????????????????????????????????????????";

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
      setIsWinGame(true);
    }
  };

  useEffect(() => {
    let newArr: any = [];
    if (selectedCount) {
      // Generate for numbers
      if (selectedValue.type !== 0) {
        for (let i = 0; i < selectedCount; i++) {
          let newValue = onGenerateBoardForNumbers(newArr, i);
          newArr.push(newValue);
        }
        // Generate for letters
      } else {
        for (let i = 0; i < selectedCount; i++) {
          let newValue = onGenerateBoardForLetters(newArr, i);
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
      // IF USER SELECTED NUMBER
      if (selectedValue.type === 1) {
        if (selectedDirection === DIRECTIONS.ASC) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
        }
        if (selectedDirection === DIRECTIONS.DESC) {
          if (a.value > b.value) {
            return -1;
          }
          if (a.value < b.value) {
            return 1;
          }
        }
        // IF USER SELECTED LETTER
      } else {
        if (selectedDirection === DIRECTIONS.ASC) {
          if (a.value.charCodeAt() < b.value.charCodeAt()) {
            return -1;
          }
          if (a.value.charCodeAt() > b.value.charCodeAt()) {
            return 1;
          }
        }
        if (selectedDirection === DIRECTIONS.DESC) {
          if (a.value.charCodeAt() > b.value.charCodeAt()) {
            return -1;
          }
          if (a.value.charCodeAt() < b.value.charCodeAt()) {
            return 1;
          }
        }
      }

      return 0;
    }

    arrayForDroppedBoards = arrayForDroppedBoards.sort(compare);
    setDroppedBoards(arrayForDroppedBoards);
  }, []);

  function onGenerateBoardForLetters(
    arr: any,
    i: number
  ): { id: number; value: string } | {} {
    let newObj: SingleBoardInterface | {} = {};
    onCheckHaveDublicate();

    function onCheckHaveDublicate(): void {
      let RandomNumber = generateRandomNumber(Ruletters.length - 1);
      const selectedLetter = Ruletters[RandomNumber];
      let hasDublicate = arr.find((el: any) => el.value === selectedLetter);
      if (hasDublicate) {
        onCheckHaveDublicate();
        return;
      }

      newObj = {
        id: i,
        value: Ruletters[RandomNumber],
      };
    }
    return newObj;
  }

  function onGenerateBoardForNumbers(arr: any, i: number) {
    let newObj: SingleBoardInterface | null = null;
    onCheckHaveDublicate();

    function onCheckHaveDublicate(): void {
      let RandomNumber = generateRandomNumber(selectedValue.label);
      let hasDublicate = arr.find((el: any) => el.value === RandomNumber);
      if (hasDublicate) {
        onCheckHaveDublicate();
        return;
      }

      newObj = {
        id: i,
        value: RandomNumber,
      };
    }
    return newObj;
  }

  function generateRandomNumber(num: string | number) {
    return Math.floor(Math.random() * +num) + 1;
  }

  function handleFindTheme() {
    const RandomInitial: number = Math.floor(Math.random() * 4) + 1;
    setSelectedTheme(GAME_THEMES[`theme${RandomInitial}`]);
    // setSelectedTheme(GAME_THEMES[`theme3`]);
  }

  const handleDrop = useCallback(
    (index: any, item: any, droppedBoards: SingleBoardInterface[]) => {
      const newDroppedBoards = droppedBoards.map((board) => {
        if (board.id === item.id) {
          board.isDropped = true;
        }
        return board;
      });

      handlePlaySliderMoveAudio();
      setDroppedBoards(newDroppedBoards);
    },
    []
  );

  function handlePlaySliderMoveAudio(): void {
    if (successAudio) {
      successAudio.volume = 0.3;
      successAudio.pause();
      successAudio.currentTime = 0;
      successAudio?.play();
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        backgroundColor={selectedTheme?.backgroundColor || "#fff"}
        className={selectedTheme?.name}
      >
        {IsWinGame && <WinGame />}
        <NumbersBoxContainer>
          {boards.map((board: SingleBoardInterface, index: number) => {
            const currentDroppedBoard: SingleBoardInterface | undefined =
              droppedBoards.find((b) => b.id === board.id);
            return (
              <DraggablItem
                key={index.toString()}
                type={board.value.toString()}
                i={index}
                selectedTheme={selectedTheme}
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
                ? "???? ??????????????????????"
                : "???? ????????????????"}
            </p>
          </AscDescBox>
          {boards.map((i) => (
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
          >
            {droppedBoards.map((board: SingleBoardInterface, i: number) => (
              <DroppableItem
                accept={[board.value.toString()]}
                key={i.toString()}
                onDrop={(item: SingleBoardInterface) =>
                  handleDrop(i, item, droppedBoards)
                }
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

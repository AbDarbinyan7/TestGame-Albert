import React, { useContext } from "react";
import styled from "@emotion/styled";
import {
  CountContext,
  DirectionContext,
  GameStartedContext,
  ValueContext,
} from "../../Context";
import StarIcon from "../StarIcon/StarIcon";
import StartGameButton from "../StartGameButton/StartGameButton";
import { valueMarks } from "../../pages/Home/HomeData";

const ModalContainer = styled.div(() => ({
  width: "100%",
  background: "#20153699 70%",
  position: "absolute",
  top: "0",
  bottom: "0",
  zIndex: "999999",
}));

const Modal = styled.div(() => ({
  width: "700px",
  height: "550px",
  backgroundImage: "url(/Images/WinGame/Modal.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  display: "flex",
  gap: "25px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  margin: "160px auto",
  color: "#5F40A1",
  fontSize: "40px",
  textAlign: "center",
  padding: "40px",
  position: "relative",
}));

const FirstStar = styled.img(() => ({
  position: "absolute",
  left: "-50px",
  top: "-50px",
}));

const SecondStar = styled.img(() => ({
  position: "absolute",
  right: "-78px",
  top: "108px",
  height: "242px",
}));

const ThiredStart = styled.img(() => ({
  position: "absolute",
  right: "-78px",
  top: "108px",
  height: "242px",
}));

const WinGame = () => {
  const { selectedCount, setSelectedCount } = useContext<any>(CountContext);
  const { selectedValue, setSelectedValue } = useContext<any>(ValueContext);
  const { selectedDirection, setSelectedDirection } =
    useContext<any>(DirectionContext);
  const { gameStarted, setGameStarted } = useContext<any>(GameStartedContext);

  function handleRestartGame() {
    setSelectedCount(2);
    setSelectedValue(valueMarks[0]);
    setGameStarted(false);
  }
  return (
    <ModalContainer>
      <Modal>
        <StarIcon top="-50px" left="-50px" />
        <StarIcon top="108px" right="-78px" size="large" />
        <StarIcon bottom="-30px" left="-90px" size="large" />
        <StarIcon bottom="-16px" right="-47px" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <img src="/Images/WinGame/Win.png" alt="" />

          <p
            style={{
              // marginTop: "27px",
              maxWidth: "520px",
            }}
          >
            Молодец! Ты успешно справился c заданием!
          </p>
        </div>
        <StartGameButton
          onClick={handleRestartGame}
          text="Заново"
          bgColor=" #2BD600"
        />
      </Modal>
    </ModalContainer>
  );
};

export default WinGame;

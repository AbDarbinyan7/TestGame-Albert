import React from "react";
import styled from "@emotion/styled";

interface StartButtonInterface {
  onClick: any;
}

const Button = styled.button({
  background: "#38DF7A",
  fontFamily: "Helvetica",
  fontSize: "32px",
  borderRadius: "20px",
  color: "#fff",
  width: 260,
  height: 60,
  transition: "transform  0.1s ease",
  [`:hover`]: {
    transform: "scale(1.1)",
    background: "#2bad5e",
  },
  [`:active`]: {
    background: "#2bad5e",
  },
});

const StartGameButton: React.FC<StartButtonInterface> = ({
  onClick,
}: StartButtonInterface) => {
  return <Button onClick={onClick}>Играть</Button>;
};

export default StartGameButton;

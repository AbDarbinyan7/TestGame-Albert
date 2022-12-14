import React from "react";
import styled from "@emotion/styled";

interface StartButtonInterface {
  onClick: any;
  text?: string;
  bgColor?: string;
}

const Button = styled.button((props: StartButtonInterface) => ({
  background: props.bgColor || "#38DF7A",
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
}));

const StartGameButton: React.FC<StartButtonInterface> = ({
  onClick,
  text,
  bgColor,
}: StartButtonInterface) => {
  return (
    <Button bgColor={bgColor} onClick={onClick}>
      {text}
    </Button>
  );
};

export default StartGameButton;

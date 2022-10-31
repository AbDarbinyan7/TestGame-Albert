import React from "react";
import styled from "@emotion/styled";

interface AskDescInterface {
  onClick: any;
  selectedDirection: string;
}

interface AskDescButtonInterace {
  selectedDirection: Boolean;
}

export const DIRECTIONS = {
  ASC: "ASC",
  DESC: "DESC",
};

const AscDescContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "36px",
});

const Button = styled.button((props: AskDescButtonInterace) => ({
  background: "#FFD748",
  fontFamily: "Calibri",
  fontSize: "32px",
  borderRadius: "20px",
  color: "#423F45",
  padding: "0 21px",
  marginTop: "50px",
  opacity: props.selectedDirection ? "1" : "0.5",
}));

const AscDesc: React.FC<AskDescInterface> = ({
  onClick,
  selectedDirection,
}: AskDescInterface) => {
  return (
    <AscDescContainer>
      <Button
        selectedDirection={selectedDirection === DIRECTIONS.ASC}
        onClick={() => onClick(DIRECTIONS.ASC)}
      >
        По возрастанию
      </Button>
      <Button
        selectedDirection={selectedDirection === DIRECTIONS.DESC}
        onClick={() => onClick(DIRECTIONS.DESC)}
      >
        По убыванию
      </Button>
    </AscDescContainer>
  );
};

export default AscDesc;

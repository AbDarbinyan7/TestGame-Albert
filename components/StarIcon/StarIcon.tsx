import styled from "@emotion/styled";

interface StarIconInterface {
  top?: string | undefined;
  bottom?: string | undefined;
  left?: string | undefined;
  right?: string | undefined;
  size?: string | undefined;
}
const Star = styled.img((props: StarIconInterface) => ({
  position: "absolute",
  left: props.left || "initial",
  right: props.right || "initial",
  top: props.top || "initial",
  bottom: props.bottom || "initial",
  height: props.size === "large" ? "242px" : "initial",
}));

const StarIcon = ({
  top,
  bottom,
  left,
  right,
  size = "small",
}: StarIconInterface) => {
  return (
    <Star
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      size={size}
      src="/Images/WinGame/Star.png"
      alt=""
    />
  );
};

export default StarIcon;

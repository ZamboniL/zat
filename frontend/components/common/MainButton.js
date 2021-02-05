import styled from "styled-components";

export const MainButton = ({
  children,
  style,
  bgColor,
  hoverBgColor,
  color,
  onClick,
}) => {
  return (
    <Button
      hoverBgColor={hoverBgColor}
      color={color}
      bgColor={bgColor}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1.2rem;
  background: ${({ bgColor }) =>
    bgColor ? bgColor : "var(--secondary-color)"};
  padding: 0.4rem 1rem;
  border-radius: 10px;
  color: ${({ color }) => (color ? color : "white")};
  width: fit-content;
  cursor: pointer;
  transition: background 0.2s ease-in;
  :hover {
    background: ${({ hoverBgColor }) =>
      hoverBgColor ? hoverBgColor : "var(--secondary-shade)"};
  }
`;

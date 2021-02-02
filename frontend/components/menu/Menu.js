import { useRef, useEffect } from "react";
import styled from "styled-components";

export const Menu = ({ open, setOpen }) => {
  const clickRef = useRef();
  const handleClickOutside = (e) => {
    if (!clickRef.current.contains(e.target)) setOpen(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return <StyledMenu ref={clickRef} open={open} />;
};

const StyledMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--primary-shade);
  border-bottom-right-radius: 3rem;
  border-top-right-radius: 3rem;
  height: 100vh;
  width: 80vw;
  transition: transform 0.3s ease-in-out;
  box-shadow: 8px 0px 6px rgba(0, 0, 0, 0.3);
  z-index: 1;

  transform: ${({ open }) =>
    open ? "translateX(0px)" : "translateX(-1000px)"};
  @media (min-width: 760px) {
    display: none;
  }
`;

export default Menu;

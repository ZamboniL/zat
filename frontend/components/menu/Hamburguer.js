import styled from "styled-components";

export const Hamburger = ({ open, setOpen }) => {
  return (
    <Burger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </Burger>
  );
};

const Burger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.15rem;
    background: ${({ open }) =>
      open ? "var(--primary-shade)" : "var(--white)"};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 0%;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media (min-width: 760px) {
    display: none;
  }
`;

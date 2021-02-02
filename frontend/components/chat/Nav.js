import styled from "styled-components";

export const Nav = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.nav`
  position: relative;
  grid-row: 1 / 2;
  background: var(--primary-shade);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (min-width: 760px) {
    padding: unset;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20% 80%;
    background: var(--primary-color);
  }
  @media (min-width: 1100px) {
    grid-template-columns: 20% 60% 20%;
  }
`;

import styled from "styled-components";

export const Body = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.section`
  grid-row: 2 / 3;
  background: var(--primary-color);
  display: flex;

  @media (min-width: 760px) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20% 80%;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 20% 60% 20%;
  }
`;

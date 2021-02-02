import styled from "styled-components";

export const Bottom = ({ children }) => {
  return (
    <Container>
      {children}
      <Filler />
    </Container>
  );
};

const Container = styled.section`
  grid-row: 3 / 4;
  background: var(--primary-shade);
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
  display: flex;

  @media (min-width: 760px) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 20% 80%;
    background: var(--primary-color);
    box-shadow: unset;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 20% 60% 20%;
  }
`;

const Filler = styled.div`
  grid-column: 3 / 4;
  background: var(--primary-shade);
`;

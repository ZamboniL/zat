import styled from "styled-components";

export const Body = ({ children, full }) => {
  return <Container full={full}>{children}</Container>;
};

const Container = styled.section`
  grid-row: ${({ full }) => (full ? "2 / 4" : "2 / 3")};
  background: var(--primary-color);
  display: flex;
  position: relative;

  @media (min-width: 760px) {
    display: grid;
    grid-template-columns: 20% 80%;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 20% 60% 20%;
  }
`;

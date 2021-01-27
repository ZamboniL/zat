import styled from "styled-components";

const Container = styled.section`
  grid-column: 1/ 2;
  grid-row: 1 / 3;
  background: rgba(0, 0, 0, 0.15);
`;

export default function Group() {
  return <Container></Container>;
}

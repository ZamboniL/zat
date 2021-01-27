import styled from "styled-components";

const Container = styled.section`
  background: rgba(0, 0, 0, 0.15);
  grid-row: 1 / 4;
  grid-column: 3 / 4;
  padding: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

export default function Members() {
  return (
    <Container>
      <Title>Membros</Title>
    </Container>
  );
}

import styled from "styled-components";

const Container = styled.section`
  height: 100vh;
  background: #2b2d42;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 90% 10%;
`;

const BoxShadow = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default function ChatLayout({ children }) {
  return (
    <Container>
      <BoxShadow />
      {children}
    </Container>
  );
}

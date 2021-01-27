import styled from "styled-components";

const Container = styled.section`
  height: 100vh;
  background: #2b2d42;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 90% 10%;
`;

export default function ChatLayout({ children }) {
  return <Container>{children}</Container>;
}

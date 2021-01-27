import styled from "styled-components";

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style: none;
  overflow-y: scroll;
  margin-right: 5px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    transition: background 0.15s ease-in-out;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const Item = styled.li`
  padding: 0.5rem 1rem;
  word-break: break-word;
  transition: background 0.15s ease-in-out;
  color: rgba(255, 255, 255, 0.8);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export default function Chat() {
  return (
    <Container>
      <List>
        <Item>hahahaa</Item>
      </List>
    </Container>
  );
}

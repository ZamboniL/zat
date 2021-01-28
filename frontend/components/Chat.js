import styled from "styled-components";
import Messages from "./Messages";

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const List = styled.ul`
  list-style: none;
  overflow-y: scroll;
  margin-right: 5px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-group_messageswebkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    transition: background 0.15s ease-in-out;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

export default function Chat({ messages }) {
  return (
    <Container>
      <List>
        <Messages messagesArray={messages} />
      </List>
    </Container>
  );
}

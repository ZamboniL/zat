import { useEffect, useRef } from "react";
import styled from "styled-components";
import Messages from "./Messages";
import List from "./styledComponents/List";

export default function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container>
      <List>
        <Messages messageHistoryArray={messages} />
        <div ref={messagesEndRef} />
      </List>
    </Container>
  );
}
const Container = styled.section`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;

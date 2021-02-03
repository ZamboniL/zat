import { useEffect, useRef } from "react";
import styled from "styled-components";
import Messages from "./Messages";

export default function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <List>
      <Messages messageHistoryArray={messages} />
      <div ref={messagesEndRef} />
    </List>
  );
}

const List = styled.ul`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  list-style: none;
  overflow-y: scroll;
  margin-right: 5px;
  height: 100%;
  width: 100%;

  &::-webkit-scrollbar {
    width: 5px;
    background: var(--primary-color);
    padding: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-shade);
    border-radius: 10px;
    transition: background 0.15s ease-in-out;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

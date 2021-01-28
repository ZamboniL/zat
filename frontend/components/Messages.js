import styled from "styled-components";
import timeAgo from "../lib/timeAgo";

const Messages = ({ messagesArray }) => {
  return (
    <>
      {messagesArray.map((message) => {
        return (
          <Item>
            <Name>{message.user.username}</Name>{" "}
            <time> {timeAgo(message.updatedAt)}</time>
            <div>{message.content}</div>
          </Item>
        );
      })}
    </>
  );
};

const Name = styled.span`
  padding-bottom: 0.4rem;
  color: #528351;
  display: inline-block;
  font-weight: bold;
`;

const Item = styled.li`
  padding: 0.5rem 1rem;
  word-break: break-word;
  transition: background 0.15s ease-in-out;
  color: rgba(255, 255, 255, 0.8);
  margin: 1rem 0 1rem;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export default Messages;

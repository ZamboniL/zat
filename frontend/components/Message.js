import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";
const Message = ({ user, time, content }) => {
  return (
    <Item>
      <ProfilePicture src={user.picture_filename} height="40px" width="40px" />
      <MessageInfo>
        <div>
          <Name>{user.username}</Name>
          <time> {time}</time>
        </div>
        <span>{content}</span>
      </MessageInfo>
    </Item>
  );
};

const Name = styled.span`
  color: #528351;
  display: inline-block;
  font-weight: bold;
`;

const Item = styled.li`
  word-break: break-word;
  transition: background 0.15s ease-in-out;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  margin-top: 1rem;
  padding: 1rem 0.5rem;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  div {
    flex-shrink: 0;
  }
`;

const MessageInfo = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  justify-content: center;

  time {
    font-size: 0.8rem;
    color: var(--white-shade);
  }
`;

export default Message;

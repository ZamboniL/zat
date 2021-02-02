import Message from "../components/Message";
import timeAgo from "./timeAgo";

// Creates the Message li from the api response
export default function createMessage(message) {
  if (!message) return null;
  if (!message.user) return null;
  return (
    <Message
      key={message.createdAt}
      user={message.user}
      time={timeAgo(message.updatedAt)}
      content={message.content}
    />
  );
}

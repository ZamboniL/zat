import createMessage from "../lib/createMessage";

const Messages = ({ messageHistoryArray, newMessagesArray }) => {
  return (
    <>
      {messageHistoryArray.map((message) => {
        return createMessage(message);
      })}
    </>
  );
};

export default Messages;

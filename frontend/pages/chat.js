import ChatLayout from "../components/ChatLayout";
import Chat from "../components/Chat";
import Members from "../components/Members";
import MessageBar from "../components/MessageBar";
import Groups from "../components/Groups";

export default function ChatBoard() {
  return (
    <ChatLayout>
      <Groups />
      <Chat />
      <MessageBar />
      <Members />
    </ChatLayout>
  );
}

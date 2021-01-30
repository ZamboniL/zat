import ChatLayout from "../../components/ChatLayout";
import Chat from "../../components/Chat";
import Members from "../../components/Members";
import MessageBar from "../../components/MessageBar";
import Groups from "../../components/Groups";
import { useState } from "react";
import axios from "axios";
import { authAndData, ensureAuth } from "../../lib/auth";
import { getData } from "../../lib/getData";

export default function User({ group, messages, user, config }) {
  const [content, setContent] = useState("");
  const handleMessageChange = (e) => setContent(e.target.value);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.target.messageBar.value = "";
    const postData = { content, user, group: group._id };
    await axios
      .post("http://localhost:4000/api/message/new", postData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ChatLayout>
      <Groups />
      <Chat messages={messages} />
      <MessageBar
        onMessageChange={handleMessageChange}
        onMessageSubmit={handleMessageSubmit}
      />
      <Members members={group.users} />
    </ChatLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  var userWithToken = await ensureAuth(ctx); // Validate User
  const data = await getData(
    "api/group/601076970607f0ddc42602b0",
    userWithToken
  );
  return {
    props: {
      group: data.group,
      messages: data.group_messages,
      user: userWithToken.user,
      config: userWithToken,
    },
  };
};

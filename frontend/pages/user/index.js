import ChatLayout from "../../components/ChatLayout";
import Chat from "../../components/Chat";
import Members from "../../components/Members";
import MessageBar from "../../components/MessageBar";
import Groups from "../../components/Groups";
import { useState } from "react";
import axios from "axios";

export default function User({ data, header }) {
  const [message, setMessage] = useState("");
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.target.messageBar.value = "";

    // fetch("http://localhost:4000/api/message/new", {
    //   method: "POST",
    //   body: { content: message, group: data.group._id },
    // });

    const postData = { content: message, group: data.group._id };
    await axios
      .post("http://localhost:4000/api/message/new", postData, header)
      .then((response) => {
        console.log(response);
      })
      .catch(
        (err) => {
          console.log(err.data);
        },
        { withCredentials: true }
      );
  };

  return (
    <ChatLayout>
      <Groups />
      <Chat messages={data.group_messages} />
      <MessageBar
        onMessageChange={handleMessageChange}
        onMessageSubmit={handleMessageSubmit}
      />
      <Members members={data.group.users} />
    </ChatLayout>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(
    `http://localhost:4000/api/groups/601076970607f0ddc42602b0`
  );

  const data = await res.json();
  var token = ctx.req.headers.cookie.toString().replace("connect.sid=", "");
  console.log(token);
  const header = { headers: { authorization: `Bearer ${token}` } };

  return { props: { data, header } };
}

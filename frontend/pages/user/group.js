import Chat from "../../components/Chat";
import Members from "../../components/Members";
import MessageBar from "../../components/MessageBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ensureAuth } from "../../lib/auth";
import { getData } from "../../lib/getData";
import { Layout } from "../../components/chat/Layout";
import { Nav } from "../../components/chat/Nav";
import { Body } from "../../components/chat/Body";
import { Bottom } from "../../components/chat/Bottom";
import styled from "styled-components";
import { Hamburger } from "../../components/menu/Hamburguer";
import Menu from "../../components/menu/Menu";
import { ProfilePicture } from "../../components/ProfilePicture";
import { ReturnArrow } from "../../components/ReturnArrow";
import { GroupChats } from "../../components/GroupChats";
import { io } from "socket.io-client";

export default function Group({ group, messages, user, config }) {
  // Message content
  const [messagesArray, setMessages] = useState(messages);
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("new message", (message) => {
      const getNewMessages = async function () {
        setMessages(
          await getData("api/message/group/601076970607f0ddc42602b0", config)
        );
      };
    });
  }, []);
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
        console.log(err.response);
      });
  };

  // Open state for the hamburguer menu on mobile
  const [open, setOpen] = useState(false);

  //
  return (
    <Layout>
      <Nav>
        <ReturnArrow />
        <header>
          <h1>{group.title}</h1>
          <Desc>{group.desc}</Desc>
        </header>
        <Hamburger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </Nav>

      <Body>
        <GroupChats channels={group.canais} />
        <Members members={group.users} className="members" />
        <Chat messages={messagesArray} className="chat" />
      </Body>

      <Bottom>
        <UserArea>
          <ProfilePicture
            src={user.picture_filename}
            height="50px"
            width="50px"
          />
          <span>{user.username}</span>
        </UserArea>
        <MessageBar
          onMessageChange={handleMessageChange}
          onMessageSubmit={handleMessageSubmit}
        />
      </Bottom>
    </Layout>
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

const Desc = styled.span`
  font-size: 0.8rem;
  display: block;
  width: 100%;
  padding-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserArea = styled.section`
  background: var(--primary-dark);
  display: none;
  @media (min-width: 760px) {
    grid-column: 1 / 2;
    display: flex;

    align-items: center;
    padding: 1rem;
  }
  span {
    padding-left: 0.5rem;
  }
`;

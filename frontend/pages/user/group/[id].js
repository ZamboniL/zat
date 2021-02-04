import Chat from "../../../components/Chat";
import Members from "../../../components/Members";
import MessageBar from "../../../components/MessageBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ensureAuth } from "../../../lib/auth";
import { getData } from "../../../lib/getData";
import { Layout } from "../../../components/chat/Layout";
import { Nav } from "../../../components/chat/Nav";
import { Body } from "../../../components/chat/Body";
import { Bottom } from "../../../components/chat/Bottom";
import styled from "styled-components";
import { Hamburger } from "../../../components/menu/Hamburguer";
import Menu from "../../../components/menu/Menu";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { ReturnArrow } from "../../../components/ReturnArrow";
import { GroupChats } from "../../../components/GroupChats";
import { Title } from "../../../components/Title";
import { socket } from "../../../service/socket";
import { FormModal } from "../../../components/FormModal";
import { NewUserForm } from "../../../components/NewUserForm";

export default function Group({ group, messages, user, config }) {
  useEffect(() => {
    socket.emit("in group", group.tag);
  }, []);
  // Message content
  const [messagesArray, setMessages] = useState(messages);
  useEffect(() => {}, []);
  const [content, setContent] = useState("");
  const handleMessageChange = (e) => setContent(e.target.value);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.target.messageBar.value = "";
    const postData = { content, user, group: group._id };
    await axios
      .post("http://localhost:4000/api/message/new", postData, config)
      .then((res) => {
        socket.emit("new message", res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const [currentMembers, setCurrentMembers] = useState(group.users);
  useEffect(() => {
    socket.on("get new messages", (message) => {
      setMessages((newMessage) => [...newMessage, message]);
    });
    socket.on("get new user", (user) => {
      setCurrentMembers((currentMembers) => [...currentMembers, user]);
    });
  }, []);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => setTag(e.target.value);
  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/group/new_user",
        { tag, groupId: group._id },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setTag("");
          setUserModalOpen(false);
          socket.emit("new user added", res.data, group);
          return true;
        }
      })
      .catch((err) => console.log(err));
  };

  // Open state for the hamburguer menu on mobile
  const [open, setOpen] = useState(false);

  //
  return (
    <Layout>
      <FormModal open={userModalOpen} setOpen={setUserModalOpen}>
        <NewUserForm
          onSubmit={handleNewUserSubmit}
          onTagChange={handleTagChange}
        />
      </FormModal>
      <Nav>
        <ReturnArrow />
        <Title title={group.title} desc={group.desc} />
        <Hamburger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </Nav>

      <Body>
        <GroupChats channels={group.canais} />
        <Members
          members={currentMembers}
          className="members"
          onClick={() => setUserModalOpen(true)}
        />
        <Chat messages={messagesArray} className="chat" />
      </Body>

      <Bottom>
        <UserArea>
          <ProfilePicture
            src={user.picture_filename}
            height="50px"
            width="50px"
          />
          <div>
            <span>{user.username}</span>
            <span>{user.tag}</span>
          </div>
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
  const { id } = ctx.query;
  const data = await getData(`api/group/${id}`, userWithToken);
  const condition = data.group.users.some(
    (user) => user._id === userWithToken.user._id
  );
  if (!condition) {
    console.log(data.group.users._id);
    ctx.res.writeHead(302, { Location: "/user" });
    ctx.res.end();
  }
  console.log(userWithToken.user.picture_filename);
  return {
    props: {
      group: data.group,
      messages: data.group_messages,
      user: userWithToken.user,
      config: userWithToken,
    },
  };
};

const UserArea = styled.section`
  background: var(--primary-dark);
  display: none;
  @media (min-width: 760px) {
    grid-column: 1 / 2;
    display: flex;

    align-items: center;
    padding: 1rem;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  div span {
    padding-left: 0.5rem;
  }
  div span:nth-child(2) {
    font-size: 0.8rem;
    color: var(--white-shade);
  }
`;

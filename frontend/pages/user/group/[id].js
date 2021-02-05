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
import Emoji from "../../../components/emojiPicker";
import { imageUpload } from "../../../lib/uploadFile";

export default function Group({ group, messages, user, config }) {
  useEffect(() => {
    socket.emit("in group", group.tag);
  }, []);
  // Message content
  const [messagesArray, setMessages] = useState(messages);
  useEffect(() => {}, []);
  const [content, setContent] = useState("");
  const [emojiShopOpen, setEmojiShopOpen] = useState(false);
  const handleEmojiSelect = (emoji) => {
    setEmojiShopOpen(!emojiShopOpen);
    setContent(content + emoji.native);
  };
  const handleMessageChange = (e) => setContent(e.target.value);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    e.target.messageBar.value = "";
    const postData = { content, user, group: group._id };
    await axios
      .post(`${process.env.SERVER_URL}/api/message/new`, postData, config)
      .then((res) => {
        setContent("");
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
        `${process.env.SERVER_URL}api/group/new_user`,
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
  const [profilePicture, setProfilePicture] = useState("y");
  const [picturePreview, setPicturePreview] = useState(
    `/images/userProfile/${user.picture_filename}`
  );
  console.log(picturePreview);
  const handlePictureChange = async (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setProfilePicture(undefined);
      return;
    }
    setProfilePicture(e.target.files[0]); // first save picture to the preview so user can see the new picture without updating
    let picture_filename = "default.png";
    await imageUpload(e.target.files[0], "./public/images/userProfile/").then(
      (res) => (picture_filename = res.data.files.file.name) // save uploaded image filename
    );
    axios.post(
      `${process.env.SERVER_URL}api/user/picture`,
      { picture_filename },
      config
    );
  };

  useEffect(() => {
    if (!profilePicture) {
      setPicturePreview(undefined);
      return;
    }
    if (profilePicture === "y") {
      return;
    }
    const objectUrl = URL.createObjectURL(profilePicture); // Generate url for component background-image
    setPicturePreview(objectUrl);
    return () => URL.revokeObjectURL(profilePicture); // Close URL when component is closed
  }, [profilePicture]);
  //
  return (
    <Layout title={group.title}>
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
        <Menu
          user={user}
          onPictureChange={handlePictureChange}
          picture={picturePreview}
          open={open}
          setOpen={setOpen}
        />
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
            src={`/images/userProfile/${user.picture_filename}`}
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
          content={content}
        ></MessageBar>
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
    ctx.res.writeHead(302, { Location: "/user" });
    ctx.res.end();
  }
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

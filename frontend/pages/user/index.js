import { Layout } from "../../components/chat/Layout";
import { Nav } from "../../components/chat/Nav";
import { Body } from "../../components/chat/Body";
import { ensureAuth } from "../../lib/auth";
import { GroupList } from "../../components/GroupList";
import { Hamburger } from "../../components/menu/Hamburguer";
import Menu from "../../components/menu/Menu";
import { useState } from "react";
import { UserTitle } from "../../components/UserTitle";
import { UserPannel } from "../../components/UserPannel";
import { UserList } from "../../components/FriendList";
import styled from "styled-components";
import { FormModal } from "../../components/FormModal";
import { NewGroupForm } from "../../components/NewGroupForm";
import { NewFriendForm } from "../../components/NewFriendForm";
import axios from "axios";
import { getData } from "../../lib/getData";

export default function User({ user, config, groups }) {

  // New Group Creation ---------------------------------------
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescChange = (e) => setDesc(e.target.value);
  const handleNewGroupSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/group/new",
        { title, desc, user },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setTitle("");
          setDesc("");
          setGroupModalOpen(false);
          return true;
        }
      })
      .catch((err) => console.log(err));
  };
  // ----------------------------------------------------------

  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => setTag(e.target.value);
  const handleNewFriendSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/new_friend", { tag, user }, config)
      .then((res) => {
        if (res.status === 200) {
          setTag("");
          setFriendModalOpen(false);
          return true;
        }
      })
      .catch((err) => console.log(err));
  };
  // Open state for the hamburguer menu on mobile
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState("Amigos");
  return (
    <Layout>
      <FormModal open={groupModalOpen} setOpen={setGroupModalOpen}>
        <NewGroupForm
          onSubmit={handleNewGroupSubmit}
          onTitleChange={handleTitleChange}
          onDescChange={handleDescChange}
        />
      </FormModal>
      <FormModal open={friendModalOpen} setOpen={setFriendModalOpen}>
        <NewFriendForm
          onSubmit={handleNewFriendSubmit}
          onTagChange={handleTagChange}
        />
      </FormModal>
      <Nav>
        <UserTitle
          title={"Ola, " + user.username + "!"}
          category={category}
          setCategory={setCategory}
        />
        <Hamburger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </Nav>
      <Body full={true}>
        <UserPannel username={user.username} />
        <GroupList
          groups={groups}
          category={category}
          modal={setGroupModalOpen}
        />
        <UserList
          friends={user.friends}
          category={category}
          modal={setFriendModalOpen}
        />
        <RightBar />
      </Body>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  var userWithToken = await ensureAuth(ctx); // Validate User
  const info = await getData(
    `api/user/info/${userWithToken.user._id}`,
    userWithToken
  );
  const { user, groups } = info;
  return {
    props: {
      user,
      config: userWithToken,
      groups,
    },
  };
};

const RightBar = styled.section`
  @media (min-width: 1100px) {
    grid-column: 3/ 4;
    background: var(--primary-shade);
    position: relative;
    z-index: 2;
  }
`;

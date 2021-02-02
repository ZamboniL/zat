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

export default function User({ user }) {
  // Open state for the hamburguer menu on mobile
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState("Amigos");
  return (
    <Layout>
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
        <GroupList category={category} />
        <UserList category={category} />
        <RightBar />
      </Body>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  var userWithToken = await ensureAuth(ctx); // Validate User
  return {
    props: {
      user: userWithToken.user,
      config: userWithToken,
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

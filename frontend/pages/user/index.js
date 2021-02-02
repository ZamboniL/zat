import { Layout } from "../../components/chat/Layout";
import { Nav } from "../../components/chat/Nav";
import { Body } from "../../components/chat/Body";
import { Bottom } from "../../components/chat/Bottom";
import { ensureAuth } from "../../lib/auth";
import { GroupList } from "../../components/GroupList";
export default function User() {
  return (
    <Layout>
      <Nav></Nav>
      <Body>
        <GroupList />
      </Body>
      <Bottom></Bottom>
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

import { Body } from "../components/chat/Body";
import { Layout } from "../components/chat/Layout";
import { Bottom } from "../components/chat/Bottom";
import { Nav } from "../components/chat/Nav";

export default function Home() {
  // localStorage.setItem("token", token);
  // alert("hi");
  return (
    <Layout title="index">
      <Nav />
      <Body />
      <Bottom />
    </Layout>
  );
}

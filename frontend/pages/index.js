import Hero from "../components/index/Hero";
import IndexBody from "../components/index/IndexBody";
import IndexNav from "../components/index/IndexNav";
import LandingPageLayout from "../components/index/LandingPageLayout";

export default function Home() {
  // localStorage.setItem("token", token);
  // alert("hi");
  return (
    <LandingPageLayout>
      <IndexNav />
      <Hero />
      <IndexBody />
    </LandingPageLayout>
  );
}

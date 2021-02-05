import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { MainButton } from "../common/MainButton";

export const IndexNav = () => {
  const router = useRouter();
  const handleMainButtonClick = () => {
    router.push("/login");
  };
  return (
    <Container>
      <NavFixed>
        <h1>zat</h1>
        <MainButton
          bgColor={"var(--complementary)"}
          hoverBgColor={"var(--complementary-shade)"}
          onClick={handleMainButtonClick}
        >
          login
        </MainButton>
      </NavFixed>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
`;
const NavFixed = styled.nav`
  margin: auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 100%;
  h1 {
    color: white;
    font-weight: 400;
  }
  button {
    font-size: 0.8rem;
  }
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 60%;
    min-width: 710px;
    max-width: 920px;
    font-size: 0.8rem;
    padding: 0.6rem;
    button {
      font-size: 1rem;
    }
  }
`;

export default IndexNav;

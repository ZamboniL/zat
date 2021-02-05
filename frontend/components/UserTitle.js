import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import styled from "styled-components";
import { MainButton } from "./common/MainButton";
import OnOffButton from "./common/OnOffButton";

export const UserTitle = ({ title, category, setCategory }) => {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/");
  };
  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>
      <Switcher>
        <div>
          <OnOffButton
            name="Amigos"
            currentName={category}
            setCurrentName={setCategory}
          >
            Amigos
          </OnOffButton>
          <OnOffButton
            name="Grupos"
            currentName={category}
            setCurrentName={setCategory}
          >
            Grupos
          </OnOffButton>
        </div>
        <LogoutContainer>
          <MainButton onClick={() => handleLogout()}>logout</MainButton>
        </LogoutContainer>
      </Switcher>
    </>
  );
};

const LogoutContainer = styled.div`
  display: none;
  @media (min-width: 760px) {
    padding-right: 1rem;
    display: block;
    grid-column: 2 / 3;
  }
  @media (min-width: 1100px) {
    padding: unset;
    width: fit-content;
    justify-self: center;
  }
`;

const Header = styled.header`
  display: none;
  @media (min-width: 760px) {
    display: block;
    padding: 0.5rem;
    grid-column: 1 / 2;
    background: var(--primary-shade);
    width: 100%;
    height: 100%;
    h1 {
      padding-left: 1rem;
      width: 50%;
    }
  }
`;

const Switcher = styled.div`
  grid-column: 2 / 3;
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-left: 2rem;
`;

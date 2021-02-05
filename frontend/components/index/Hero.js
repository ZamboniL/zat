import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { MainButton } from "../common/MainButton";

export const Hero = () => {
  const router = useRouter();
  const handleMainButtonClick = () => {
    router.push("/register");
  };

  return (
    <BG>
      <Container>
        <h2>com zat você</h2>
        <h1>Conversa com diversão</h1>
        <MainButton
          bgColor={"var(--complementary)"}
          hoverBgColor={"var(--complementary-shade)"}
          onClick={handleMainButtonClick}
        >
          crie sua conta
        </MainButton>
        <img src="/svg/partyboy.svg" className="boy" alt="" />
        <img
          className="popper"
          src="/svg/partyPopper.svg"
          height="50rem"
          width="50rem"
          alt=""
        />
        <img
          className="reflectPopper"
          src="/svg/partyPopper.svg"
          height="50rem"
          width="50rem"
          alt=""
        />
        <img
          className="confetti"
          src="/svg/confettiBall.svg"
          height="50rem"
          width="50rem"
          alt=""
        />
      </Container>
    </BG>
  );
};

const BG = styled.section`
  position: relative;
  background: linear-gradient(
    270deg,
    #be1931 4.76%,
    #d04c39 11.64%,
    #ffcc4d 76.56%
  );
  height: 50%;
  display: flex;
  align-items: center;
  @media (min-width: 1200px) {
    height: 80%;
  }
`;

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--black);
  padding: 1rem;

  h1 {
    font-size: 2.5rem;
    padding-bottom: 1rem;
  }
  h2 {
    font-weight: 400;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
    color: var(--black-tint);
  }
  & .boy {
    position: absolute;
    display: none;
    @media (min-width: 900px) {
      display: block;
      height: 10rem;
      right: 10%;
    }
  }
  & .popper {
    position: absolute;
    height: 10rem;
    width: 20rem;
    bottom: -50px;
    right: -150px;
    z-index: 100;
    transform: scaleX(-1);
  }
  & .reflectPopper {
    position: absolute;
    height: 10rem;
    width: 20rem;
    bottom: -50px;
    right: 250px;
    z-index: 100;
  }
  & .confetti {
    position: absolute;
    height: 10rem;
    width: 20rem;
    top: 0;
    right: -150px;
    z-index: 1;
  }
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 60%;
    max-width: 920px;
    min-width: 710px;
    h1 {
      font-size: 4rem;
      width: 75%;
    }
    h2 {
      font-size: 1rem;
      padding-left: 0.5rem;
    }
    button {
      font-size: 2rem;
    }
    & .confetti {
      height: 30rem;
      top: -250px;
      right: -100px;
      z-index: 1;
    }
    & .reflectPopper {
      right: 500px;
    }
    & .boy {
      height: 15rem;
      right: 200px;
    }
  }
`;

export default Hero;

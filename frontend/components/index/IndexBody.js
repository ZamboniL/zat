import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { MainButton } from "../common/MainButton";
import Card from "./Card";

export const IndexBody = () => {
  const router = useRouter();
  const handleMainButtonClick = () => {
    router.push("/register");
  };
  return (
    <BodyFlex>
      <img className="spy absolute" src="/svg/spy.svg" alt="" />
      <img className="hearts absolute" src="/svg/hearts.svg" alt="" />
      <img className="eggplant absolute" src="/svg/eggplant.svg" alt="" />
      <img className="poop absolute" src="/svg/poop.svg" alt="" />
      <img className="devil absolute" src="/svg/devil.svg" alt="" />
      <Card align="flex-end">
        <img className="monkey" src="/svg/monkeys.svg" alt="" />
        <div>
          <span className="title">Conversas em grupo 100% privadas</span>
          <span className="desc">
            com zat você pode ter certeza que ninguém esta escutando o seu papo
          </span>
        </div>
      </Card>
      <Card grid="1 / 9">
        <div className="image-container">
          <img className="image-half" src="/svg/heartEyes.svg" alt="" />
          <img className="image-half" src="/svg/hearty.svg" alt="" />
        </div>
        <div>
          <span className="title">Não só conversa em grupo!</span>
          <span className="desc">
            se você quiser também pode dar aquela escorregada nos DM da sua
            crush
          </span>
        </div>
      </Card>
      <Card align="flex-end">
        <img className="angry" src="/svg/angry.svg" alt="" />
        <div>
          <span className="title">SÓ NÃO VAI SER UM MERDINHA HEIN</span>
          <span className="desc">
            nós avaliamos cada report individualmente e não temos medo de banir
            quem merece!
          </span>
        </div>
      </Card>
      <Card grid="1 / 11" className="seen">
        <span className="title">Não nos deixe no visto</span>
        <img src="/svg/eyes.svg" alt="" />
      </Card>
      <MainButton
        bgColor={"var(--complementary)"}
        hoverBgColor={"var(--complementary-shade)"}
        onClick={handleMainButtonClick}
      >
        crie sua conta
      </MainButton>
    </BodyFlex>
  );
};

const BodyFlex = styled.section`
  display: flex;
  padding: 10rem 1rem;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  div img {
    height: 80px;
    align-self: center;
    justify-self: center;
  }

  & .monkey {
    height: 60px;
  }

  & .title {
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
    padding-bottom: 0.5rem;
  }
  & .desc {
    color: var(--white-shade);
    line-height: 1.4rem;
  }
  & .image-container {
    align-self: center;
    justify-self: center;
  }
  button {
    min-width: 20rem;
  }
  & .absolute {
    position: absolute;
  }
  & .spy {
    width: 5rem;
    transform: translateY(-70px);
  }
  & .hearts {
    width: 7rem;
    z-index: 3;
    transform: translateY(520px) translateX(-120px);
  }
  & .eggplant {
    width: 7rem;
    z-index: 3;
    transform: translateY(1000px) translateX(120px) rotateZ(339deg) scaleX(-1);
  }
  & .poop {
    width: 5rem;
    z-index: 3;
    transform: translateY(1120px) translateX(-120px) rotateZ(339deg);
  }
  & .devil {
    width: 5rem;
    z-index: 3;
    transform: translateY(1570px) translateX(120px);
  }
  @media (min-width: 750px) {
    & .spy {
      transform: translateY(-70px) translateX(120px);
    }
    & .hearts {
      transform: translateY(220px) translateX(-360px);
    }
    & .eggplant {
      transform: translateY(300px) translateX(380px) rotateZ(300deg) scaleX(-1);
    }
    & .poop {
      z-index: 1;
      transform: translateY(500px) translateX(360px) rotateZ(339deg);
    }
    & .devil {
      transform: translateY(530px) translateX(-360px);
    }
  }
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 10rem 0;
    flex-wrap: unset;
    height: unset;
    width: 60%;
    min-width: 710px;
    max-width: 920px;
    margin: auto;
    button {
      grid-column: 1 / 11;
      justify-self: center;
      font-size: 2.5rem;
      min-width: unset;
      margin: auto;
    }
    & .monkey {
      height: 100px;
    }
    & .image-container img {
      height: 100px;
    }
    & .angry {
      height: 150px;
      justify-self: center;
    }
    & .monkey,
    & .image-container {
      order: 1;
    }
    & .spy {
      top: 130px;
      left: 200px;
      transform: unset;
    }
    & .hearts {
      width: 8rem;
      transform: unset;

      top: 500px;
      left: -80px;
    }
    & .eggplant {
      top: 650px;
      right: -40px;
      transform: rotateZ(339deg) scaleX(-1);
    }
    & .poop {
      z-index: 4;
      right: 0px;
      bottom: 880px;
      transform: unset;
    }
    & .devil {
      bottom: 880px;
      left: 0px;
      transform: unset;
    }
    @media (min-width: 1330px) {
      & .eggplant {
        top: 650px;
        right: 150px;
      }
      & .devil {
        left: 200px;
      }
    }
  }
`;

export default IndexBody;

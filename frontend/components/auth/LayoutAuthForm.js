import styled from "styled-components";
import Head from "next/head";

const LayoutAuthForm = ({ type, children }) => {
  return (
    <>
      <Head>
        <title>{type}</title>
        <meta
          name="description"
          content="Página de autorização do usuário Zat"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <ContainerAuthForm>{children}</ContainerAuthForm>
    </>
  );
};

const ContainerAuthForm = styled.section`
  height: 100%;
  background: linear-gradient(
    300deg,
    #be1931 4.76%,
    #d04c39 11.64%,
    #ffcc4d 76.56%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export default LayoutAuthForm;

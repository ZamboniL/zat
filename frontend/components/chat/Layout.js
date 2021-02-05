import styled from "styled-components";
import Head from "next/head";

export const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid>{children}</Grid>
    </>
  );
};

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template: 10% 80% 10% / 100%;
  overflow: hidden;

  @media (min-width: 760px) {
  } /* grid-template: 10% 80% 10% / 20% 65% 15%; */
`;

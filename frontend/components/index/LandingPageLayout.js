import styled from "styled-components";

export const LandingPageLayout = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  overflow-x: hidden;
  height: 100%;
  background: var(--primary-color);
  
`;

export default LandingPageLayout;

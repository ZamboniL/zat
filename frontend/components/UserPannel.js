import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";

export const UserPannel = ({ username }) => {
  return (
    <Container>
      <ProfilePicture
        src="/images/userProfile/default.jpg"
        width="100px"
        height="100px"
      />
      <h2>{username}</h2>
    </Container>
  );
};

const Container = styled.section`
  display: none;
  @media (min-width: 760px) {
    background: var(--primary-shade);
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }
`;

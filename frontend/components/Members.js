import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";

export default function Members({ members }) {
  return (
    <Container>
      <Title>Membros</Title>
      <MemberList>
        {members.map((member) => {
          return (
            <Member>
              <div>
                <ProfilePicture
                  src={
                    member.picture_filename
                      ? member.picture_filename
                      : "/images/userProfile/default.jpg"
                  }
                  height="20px"
                  width="20px"
                />
              </div>
              <MemberItem key={member.createdAt}>{member.username}</MemberItem>
            </Member>
          );
        })}
      </MemberList>
    </Container>
  );
}

const Container = styled.section`
  display: none;
  @media (min-width: 760px) {
    display: flex;
    flex-direction: column;
    background: var(--primary-shade);
    grid-column: 1 / 2;
    color: white;
    padding: 1rem;
  }
  @media (min-width: 1100px) {
    grid-column: 3 / 4;
  }
`;

const Title = styled.h2`
  background: var(--primary-color);
  display: block;
  width: fit-content;

  padding: 0.2rem 0;
  border-radius: 10px;
  align-items: center;
`;

const MemberList = styled.ul`
  font-size: 1rem;
  list-style: none;
  padding: 1rem 0;
`;

const Member = styled.div`
  display: flex;
  align-items: center;

  div {
    display: none;
    @media (min-width: 1100px) {
      display: block;
    }
  }
`;

const MemberItem = styled.li`
  display: block;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.2rem 0.5rem;
`;

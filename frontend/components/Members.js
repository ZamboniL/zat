import styled from "styled-components";
import { AddButton } from "./AddButton";
import { ProfilePicture } from "./ProfilePicture";

export default function Members({ members, onClick }) {
  return (
    <Container>
      <header>
        <Title>Membros</Title>
        <AddButton onClick={onClick} />
      </header>
      <MemberList>
        {members.map((member) => {
          return (
            <Member key={member.createdAt}>
              <div>
                <ProfilePicture
                  src={`/images/userProfile/${member.picture_filename}`}
                  height="20px"
                  width="20px"
                />
              </div>
              <MemberItem>{member.username}</MemberItem>
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

  header {
    display: flex;
    flex-direction: column;
    @media (min-width: 1100px) {
      flex-direction: unset;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const Title = styled.h2`
  background: var(--primary-color);
  display: block;
  width: fit-content;
  font-size: 1.25rem;

  padding: 0.2rem 0.5rem;
  margin-right: 1rem;
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

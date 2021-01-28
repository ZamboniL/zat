import styled from "styled-components";

export default function Members({ members }) {
  return (
    <Container>
      <Title>
        <h1>Membros</h1>
      </Title>
      <MemberList>
        {members.map((member) => {
          return <MemberItem>{member.username}</MemberItem>;
        })}
      </MemberList>
    </Container>
  );
}
const Container = styled.section`
  background: rgba(0, 0, 0, 0.15);
  grid-row: 1 / 4;
  grid-column: 3 / 4;
  color: white;
  font-size: 1.5rem;
  display: grid;
  grid-template-rows: 10% 90%;
`;

const Title = styled.div`
  grid-row: 1 /2;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  & h1 {
    padding-left: 1rem;
  }
`;

const MemberList = styled.ul`
  font-size: 1rem;
  list-style: none;
  padding: 1rem 0 0 1rem;
`;

const MemberItem = styled.li`
  padding: 0.2rem 0;
`;

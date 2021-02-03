import styled from "styled-components";

export const GroupChats = ({ channels }) => {
  return (
    <Container>
      <h2>Chats</h2>
      {channels.map((channel) => {
        return <div>{channel}</div>;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: none;
  padding: 1rem;
  @media (min-width: 1100px) {
    grid-column: 1 / 2;
    background: var(--primary-shade);
    display: block;
  }
  div {
    padding-bottom: 0.5rem;
  }
  div:before {
    content: "# ";
    font-weight: bold;
  }
  h2 {
    padding-bottom: 1rem;
  }
`;

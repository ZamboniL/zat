import styled from "styled-components";

export const NewFriendForm = ({ onSubmit, onTagChange, tag }) => {
  return (
    <Container>
      <Title>Adicione um amigo</Title>
      <GroupForm onSubmit={onSubmit}>
        <input
          type="text"
          name="tag"
          id="tag"
          value={tag}
          onChange={onTagChange}
          placeholder="#123456"
        />
        <span>Para adicionar alguém como amigo insira a tag dele.</span>
        <button type="submit">Adicionar</button>
      </GroupForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const Title = styled.h1`
  padding: 1rem;
  font-size: 2rem;
  color: black;
  text-align: center;
`;

const GroupForm = styled.form`
  color: black;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.2rem;
  justify-content: center;
  span {
    font-size: 0.8rem;
  }
  input,
  button {
    border: 2px solid;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  button {
    font-family: inherit;
    font-size: 1rem;
    background: unset;
    padding: 1rem;
    margin: 2rem 0;
  }
`;

import styled from "styled-components";

export default function MessageBar({ onMessageChange, onMessageSubmit }) {
  return (
    <Form autoComplete="off" onSubmit={onMessageSubmit}>
      <Input
        type="text"
        name="messageBar"
        onChange={onMessageChange}
        placeholder="conversar..."
      />
    </Form>
  );
}

const Form = styled.form`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 760px) {
    grid-column: 2 / 3;
    padding: unset;
  }
`;

const Input = styled.input`
  background: var(--primary-color);
  color: var(--white);
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 10px;
  width: 90%;

  ::placeholder {
    font-size: 0.8rem;
  }
  @media (min-width: 760px) {
    background: var(--primary-shade);
  }
`;

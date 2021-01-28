import styled from "styled-components";

const Form = styled.form`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  padding: 1rem;
`;

const Input = styled.input`
  width: 90%;
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  font-size: 1.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.15);
  color: white;
  border: none;
  outline: none;
`;

const Send = styled.button`
  font-size: 1.5rem;
  padding: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  outline: none;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  cursor: pointer;
  transition: background 0.15s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

export default function MessageBar({ onMessageChange, onMessageSubmit }) {
  return (
    <Form onSubmit={onMessageSubmit}>
      <Input type="text" name="messageBar" onChange={onMessageChange} />
      <Send>Send</Send>
    </Form>
  );
}

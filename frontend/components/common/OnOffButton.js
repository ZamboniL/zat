import styled from "styled-components";

export const OnOffButton = ({
  children,
  name,
  currentName,
  setCurrentName,
}) => {
  return (
    <Button
      name={name}
      currentName={currentName}
      onClick={() => setCurrentName(name)}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.4rem;
  border-radius: 10px;
  margin-right: 2rem;
  transition: background 0.2s ease-in-out;
  cursor: pointer;
  background: ${({ currentName, name }) =>
    currentName === name ? "var(--primary-shade)" : "unset"};
`;

export default OnOffButton;

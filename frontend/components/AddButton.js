import { FaUserPlus } from "react-icons/fa";
import styled from "styled-components";

export const AddButton = ({onClick}) => {
  return (
    <PlusButton onClick={onClick}>
      <FaUserPlus />
    </PlusButton>
  );
};

const PlusButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  place-items: center;
  transition: background 0.2s ease-in-out;
  cursor: pointer;
  svg {
    fill: var(--white);
  }
  :hover {
    background: var(--primary-dark);
  }
  @media (min-width: 760px) {
    padding: 0.8rem;
    svg {
      font-size: 1.5rem;
    }
  }
`;

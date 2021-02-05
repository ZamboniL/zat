import styled from "styled-components";

const List = styled.ul`
  position: absolute;
  list-style: none;
  overflow-y: scroll;
  margin-right: 5px;
  height: 100%;
  width: 100%;

  &::-webkit-scrollbar {
    width: 5px;
    background: var(--primary-color);
    padding: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-shade);
    border-radius: 10px;
    transition: background 0.15s ease-in-out;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

export default List;

import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

export const GroupList = ({ groups, category, modal }) => {
  return (
    <Container category={category}>
      <FlexTitle>
        <h1>Grupos</h1>
        <PlusButton
          onClick={() => {
            modal(true);
          }}
        >
          <FaPlus />
        </PlusButton>
      </FlexTitle>
      <List>
        {groups.map((group) => {
          return (
            <GroupItem>
              <Image
                src={"/images/groupProfile/fernando.png"}
                height="75px"
                width="75px"
              />
              <section>
                <h2>{group.title}</h2>
                <h3>{group.desc}</h3>
              </section>
            </GroupItem>
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  transition: transform 0.5s ease-in-out, opacity 0.2s ease-in-out;
  transform-origin: 0%;
  transform: ${({ category }) =>
    category === "Grupos" ? "translateX(0px)" : "translateX(1000px)"};
  opacity: ${({ category }) => (category === "Grupos" ? "1" : "0")};
  @media (min-width: 760px) {
    padding: 1rem;
    grid-column: 2 /3;
  }
`;
const FlexTitle = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white-shade);
`;

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

const List = styled.ul`
  list-style: none;
  overflow-y: scroll;
  height: 100%;
  @media (min-width: 760px) {
    width: 90%;
  }
`;
const GroupItem = styled.li`
  padding: 1rem;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  transition: background 0.2s ease-in-out;

  section {
    padding-left: 0.5rem;
    font-size: 1.2rem;
    width: 80%;
    h2,
    h3 {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  div {
    flex-shrink: 0;
  }
  div img {
    border-radius: 50%;
  }

  h3 {
    font-size: 0.8rem;
    color: var(--white-shade);
  }

  :hover {
    background: var(--primary-shade);
    border-radius: 10px;
  }
`;

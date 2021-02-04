import styled from "styled-components";

import Image from "next/image";
import { AddButton } from "./AddButton";
import List from "./styledComponents/List";

export const UserList = ({ friends, category, modal }) => {
  return (
    <Container category={category}>
      <FlexTitle>
        <h1>Amigos</h1>
        <AddButton
          onClick={() => {
            modal(true);
          }}
        />
      </FlexTitle>
      <List>
        {friends.map((friend) => {
          return (
            <GroupItem>
              <Image
                src={"/images/groupProfile/fernando.png"}
                height="75px"
                width="75px"
              />
              <section>
                <h2>{friend.username}</h2>
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
    category === "Amigos" ? "translateX(0px)" : "translateX(2000px)"};
  opacity: ${({ category }) => (category === "Amigos" ? "1" : "0")};
  position: absolute;
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

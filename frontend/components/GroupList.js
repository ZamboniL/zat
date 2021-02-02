import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

export const GroupList = () => {
  return (
    <Container>
      <FlexTitle>
        <h1>Grupos</h1>
        <PlusButton>
          <FaPlus />
        </PlusButton>
      </FlexTitle>
      <List>
        <GroupItem>
          <Image
            src={"/images/groupProfile/fernando.png"}
            height="75px"
            width="75px"
          />
          <section>
            <h2>hahahahahha</h2>
            <h3>hihihihhi</h3>
          </section>
        </GroupItem>
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`;
const FlexTitle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const PlusButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  place-items: center;
  transition: background 0.2s;
  svg {
    fill: var(--white);
  }
  :hover {
    background: var(--primary-dark);
  }
`;

const List = styled.ul`
  list-style: none;
`;
const GroupItem = styled.li`
  padding: 1rem 0;
  display: flex;
  width: 100%;

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
`;

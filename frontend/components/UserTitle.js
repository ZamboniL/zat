import styled from "styled-components";

export const UserTitle = ({ title, category, setCategory }) => {
  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>
      <Switcher>
        <Amigos
          category={category}
          onClick={(e) => setCategory(e.target.id)}
          id="Amigos"
        >
          Amigos
        </Amigos>
        <Grupos
          category={category}
          id="Grupos"
          onClick={(e) => setCategory(e.target.id)}
        >
          Grupos
        </Grupos>
      </Switcher>
    </>
  );
};

const Header = styled.header`
  display: none;
  @media (min-width: 760px) {
    display: block;
    padding: 0.5rem;
    grid-column: 1 / 2;
    background: var(--primary-shade);
    width: 100%;
    height: 100%;
    h1 {
      padding-left: 1rem;
      width: 50%;
    }
  }
`;

const Switcher = styled.ul`
  grid-column: 2 / 3;
  list-style: none;
  display: flex;
  margin-left: 2rem;

  li {
    font-size: 1.2rem;
    padding: 0.4rem;
    border-radius: 10px;
    margin-right: 2rem;
    transition: background 0.2s ease-in-out;
  }
`;

const Amigos = styled.li`
  background: ${({ category }) =>
    category === "Amigos" ? "var(--primary-shade)" : "unset"};
`;

const Grupos = styled.li`
  background: ${({ category }) =>
    category === "Grupos" ? "var(--primary-shade)" : "unset"};
`;

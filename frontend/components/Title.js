import styled from "styled-components";

export const Title = ({ title, desc }) => {
  return (
    <Header>
      <h1>{title}</h1>
      <Desc>{desc}</Desc>
    </Header>
  );
};

const Header = styled.header`
  @media (min-width: 760px) {
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    vertical-align: middle;
    h1 {
      display: block;
      width: fit-content;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      background: var(--primary-shade);
    }
  }
`;

const Desc = styled.span`
  font-size: 0.8rem;
  display: block;
  width: 100%;
  padding-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

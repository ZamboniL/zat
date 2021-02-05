import styled from "styled-components";

const Card = ({ className, children, align }) => {
  return (
    <Grid align={align} className={className}>
      {children}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  position: relative;
  z-index: 2;
  grid-template-rows: 40% 1fr;
  grid-gap: 2rem;
  padding: 1rem;
  margin-bottom: 4rem;
  background: var(--primary-tint);
  border-radius: 10px;
  height: 100%;
  max-width: 20rem;

  &.seen {
    height: unset;
    grid-template-rows: unset;
    grid-template-columns: 80% 20%;
    align-content: center;
    padding: 0 1rem;
    span {
      font-weight: bold;
      align-self: center;
      padding: unset;
    }
  }
  @media (min-width: 750px) {
    grid-template-rows: unset;
    grid-template-columns: 40% 1fr;
    max-width: unset;
    width: 80%;
    height: calc(100% / 3);
    margin-bottom: 6rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
    padding: 2rem;
    align-self: ${({ align }) => align};
    align-items: center;
    margin-bottom: 10rem;
    min-width: 720px;
    width: 80%;
    &.seen {
      margin-left: auto;
      margin-right: auto;
      padding: 0.5rem 4rem;
      span {
        font-size: 2rem;
      }
    }
  }
`;

export default Card;

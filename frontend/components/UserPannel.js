import styled from "styled-components";
import ImageInput from "./common/ImageInput";

export const UserPannel = ({ tag, username, picture, onChange }) => {
  return (
    <Container>
      <div>
        <ImageInput imagePreview={`${picture}`} onChange={onChange} />
        <h2>{username}</h2>
        <h3>{tag}</h3>
      </div>
      <section>
      </section>
    </Container>
  );
};

const Container = styled.section`
  display: none;
  @media (min-width: 760px) {
    background: var(--primary-shade);
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 90% 10%;
  }

  div {
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }

  section {
    grid-row: 2 / 3;
    background: var(--primary-dark);
  }

  h2 {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  h3 {
    color: var(--white-shade);
    font-size: 1rem;
    font-weight: 400;
  }
`;


import styled from "styled-components";
import ImageInput from "./common/ImageInput";

export const NewGroupForm = ({
  title,
  desc,
  onImageChange,
  imagePreview,
  onSubmit,
  onTitleChange,
  onDescChange,
}) => {
  return (
    <Container>
      <Title>Crie um novo grupo</Title>
      <GroupForm onSubmit={onSubmit}>
        <FlexCenter>
          <ImageInput imagePreview={imagePreview} onChange={onImageChange} />
        </FlexCenter>
        <label htmlFor="title">Nome</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onTitleChange}
          required
        />
        <label htmlFor="desc">Descrição</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={desc}
          onChange={onDescChange}
          required
        />
        <button type="submit">enviar</button>
      </GroupForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const Title = styled.h1`
  padding: 1rem;
  font-size: 2rem;
  color: black;
  text-align: center;
`;

const GroupForm = styled.form`
  color: black;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.2rem;
  justify-content: center;
  input[type="text"],
  button {
    border: 2px solid;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  button {
    font-family: inherit;
    font-size: 1rem;
    background: unset;
    padding: 1rem;
    margin: 2rem 0;
  }
`;
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

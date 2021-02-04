import styled from "styled-components";

export const ImageInput = ({ imagePreview, onChange }) => {
  return (
    <FileInput image={imagePreview}>
      <input type="file" name="" id="" onChange={onChange} />
    </FileInput>
  );
};

const FileInput = styled.label`
  input[type="file"] {
    opacity: 0;
  }
  width: 8rem;
  height: 8rem;
  position: relative;
  background: ${({ image }) =>
    image ? `url("${image}")` : `url("/images/groupProfile/default.jpg")`};
  background-size: cover;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  ::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    content: "";
    background: url("/svg/camera.svg") no-repeat;
    background-size: cover;
    height: 50px;
    width: 50px;
    fill: white;
    opacity: ${({ image }) => (image ? "0" : "1")};
    transition: opacity 0.2s ease-in-out;
  }
  ::before {
    content: "";
    background: black;
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    position: absolute;
    opacity: ${({ image }) => (image ? "0" : "0.5")};

    transition: opacity 0.2s ease-in-out;
  }
  :hover {
    ::before,
    ::after {
      opacity: 0.5;
    }
  }
`;

export default ImageInput;

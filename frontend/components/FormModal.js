import styled from "styled-components";

export const FormModal = ({ open, setOpen, children }) => {
  return (
    <BlackBg open={open}>
      <ModalLayout>
        <Close onClick={() => setOpen(false)}>x</Close>
        {children}
      </ModalLayout>
    </BlackBg>
  );
};

const BlackBg = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const ModalLayout = styled.div`
  position: absolute;
  height: 75%;
  width: 100%;
  background: #fff;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 10;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 1);
  @media (min-width: 760px) {
    width: 75%;
  }
  @media (min-width: 1100px) {
    width: 50%;
    max-width: 500px;
  }
`;

const Close = styled.button`
  position: absolute;
  color: black;
  font-weight: bold;
  font-size: 2rem;
  right: 20px;
  cursor: pointer;

  border: none;
  outline: none;
  background: none;

  :hover {
    color: red;
  }
`;

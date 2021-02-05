import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import ImageInput from "../common/ImageInput";
import { MainButton } from "../common/MainButton";

export const Menu = ({ user, onPictureChange, picture, open, setOpen }) => {
  const clickRef = useRef();
  const handleClickOutside = (e) => {
    if (!clickRef.current.contains(e.target)) setOpen(false);
  };
  const router = useRouter();
  const handleMainButtonClick = () => {
    destroyCookie(null, "token");
    router.push("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <StyledMenu ref={clickRef} open={open}>
      <ImageInput onChange={onPictureChange} imagePreview={picture}>
        hahh
      </ImageInput>
      <h1>{user.username}</h1>
      <h2>{user.tag}</h2>
      <MainButton onClick={() => handleMainButtonClick()}>logout</MainButton>
    </StyledMenu>
  );
};

const StyledMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--primary-shade);
  border-bottom-right-radius: 3rem;
  border-top-right-radius: 3rem;
  height: 100vh;
  width: 80vw;
  transition: transform 0.3s ease-in-out;
  box-shadow: 8px 0px 6px rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    padding-top: 1rem;
    font-size: 1.5rem;
  }
  h2 {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--white-shade);
    padding-bottom: 4rem;
  }
  transform: ${({ open }) =>
    open ? "translateX(0px)" : "translateX(-1000px)"};
  @media (min-width: 760px) {
    display: none;
  }
`;

export default Menu;

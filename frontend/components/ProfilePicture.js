import Image from "next/image";
import styled from "styled-components";

export const ProfilePicture = ({ src, height, width }) => {
  return (
    <RoundedContainer>
      <Image src={src} height={height} width={width} alt="Profile Picture" />
    </RoundedContainer>
  );
};

const RoundedContainer = styled.div`
  img {
    border-radius: 50%;
  }
`;

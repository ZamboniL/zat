import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import styled from "styled-components";

export const ReturnArrow = () => {
  return (
    <Container>
      <Link href="/user">
        <ReturnButton>
          <FaArrowLeft />
          <h3>Voltar ao painel</h3>
        </ReturnButton>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  background: var(--primary-shade);
  grid-column: 1 / 2;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ReturnButton = styled.button`
  background: none;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--white);
  display: flex;
  align-items: center;

  svg {
    height: 20px;
    width: 20px;
    fill: var(--white);
    margin-right: 0.5rem;
  }
`;

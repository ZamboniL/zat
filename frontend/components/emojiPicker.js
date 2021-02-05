import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useState } from "react";
import styled from "styled-components";
export default function emoji({ onSelect, open, setOpen }) {
  const localizationBR = {
    search: "Procure",
    categories: {
      search: "Resultados de busca",
      recent: "Utilizados recentemente",
      smileys: "Emoções",
      people: "Pessoas e corpo",
      nature: "Animais e natureza",
      foods: "Comidas e bebidas",
      activity: "Atividades",
      places: "Viagem e lugares",
      objects: "Objetos",
      symbols: "Simbolos",
      flags: "Bandeiras",
      custom: "Customizados",
    },
  };
  const emojiArray = [
    "🤔",
    "🤣",
    "😆",
    "💩",
    "😤",
    "🤑",
    "🥰",
    "😱",
    "😈",
    "🥶",
    "😡",
  ];
  const [here, setHere] = useState("😆");
  const handleSmileClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <EmojiButton emojiArray={emojiArray} onClick={() => handleSmileClick()}>
        <span
          onMouseOver={() => setHere(emojiArray[Math.floor(Math.random() * 8)])}
        >
          {here}
        </span>
      </EmojiButton>

      <EmojiPicker
        theme="dark"
        title="Escolha um emoji..."
        emoji="thinking_face"
        i18n={localizationBR}
        onSelect={onSelect}
        style={{
          opacity: `${open ? "1" : "0"}`,
          transition: "opacity 0.2s ease-in",
          position: "absolute",
          transform: "translateX(60rem) translateY(-22rem)",
        }}
      />
    </>
  );
}

const EmojiButton = styled.button`
  display: none;
  @media (min-width: 1200px) {
    display: block;
    font-size: 1.5rem;
    color: black;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    transition: 0.5s;
    position: absolute;
    transform: translateY(1.75rem) translateX(80rem);
    :hover {
      font-size: 1.75rem;
    }
  }
`;
const EmojiPicker = styled(Picker)``;

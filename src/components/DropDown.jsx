import { useContext } from "react";
import TargetingBox from "./TargetingBox";
import { MagnifierContext } from "./MousePosition";

export default function DropDown({ modal, handleChange }) {
  const { coords, magnifierSettings, selection, characters } =
    useContext(MagnifierContext);
  const { magHeight, magWidth } = magnifierSettings;
  return (
    <dialog
      ref={modal}
      className="modal"
      style={{
        top: `${coords.y - magHeight / 2}px`,
        left: `${coords.x - magWidth / 10}px`,
      }}
    >
      <div className="modalDiv">
        Who do you see?
        <TargetingBox />
        <select id="select" onChange={handleChange} value={selection}>
          <option className="option" value={null}>
            Select:
          </option>
          {characters.map((character) => {
            return (
              <option
                key={character.value}
                className="option"
                value={character.value}
              >
                {character.name}
              </option>
            );
          })}
        </select>
      </div>
    </dialog>
  );
}

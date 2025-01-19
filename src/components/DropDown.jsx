import { useContext } from "react";
import TargetingBox from "./TargetingBox";
import { MagnifierContext } from "./MousePosition";

export default function DropDown({ modal, handleChange }) {
  const { selection, characters, clientXY } = useContext(MagnifierContext);
  if (clientXY)
    return (
      <dialog
        ref={modal}
        className="modal"
        style={{
          top: `${clientXY.clientY * 0.8}px`,
          left: `${clientXY.clientX * 0.8}px`,
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

import { useContext } from "react";
import TargetingBox from "./TargetingBox";
import { MagnifierContext } from "./MousePosition";

export default function DropDown({ modal, handleChange }) {
  const { coords, magnifierSettings, selection } = useContext(MagnifierContext);
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
          <option className="option" value="waldo">
            Waldo
          </option>
          <option className="option" value="wilma">
            Wilma
          </option>
          <option className="option" value="wizard">
            The Wizard
          </option>
          <option className="option" value="odlaw">
            Odlaw
          </option>
        </select>
      </div>
    </dialog>
  );
}

import TargetingBox from "./TargetingBox";

export default function DropDown({
  coords,
  modal,
  handleChange,
  targetingBox,
}) {
  return (
    <dialog
      ref={modal}
      className="modal"
      style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
      }}
    >
      <div className="modalDiv">
        Who do you see?
        <TargetingBox targetingBox={targetingBox} />
        <select onChange={handleChange}>
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

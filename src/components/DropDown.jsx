export default function DropDown({ coords, modal, handleChange }) {
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

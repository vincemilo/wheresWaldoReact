import MagnifyingGlass from "./MagnifyingGlass";
import DropDown from "./DropDown";
import Checkmark from "./Checkmark";

export default function BackgroundImg({
  handleClick,
  src,
  setImgSize,
  setShowMagnifier,
  setXY,
  modal,
  handleChange,
  correctCoords,
}) {
  return (
    <div className="image" onClick={handleClick}>
      <img
        src={src}
        className="background"
        alt="Toggle Background"
        role="button"
        onMouseEnter={(e) => {
          setImgSize([e.target.clientWidth, e.target.clientHeight]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
      />
      <MagnifyingGlass />
      <DropDown modal={modal} handleChange={handleChange} />
      {correctCoords.map((coords) => {
        return <Checkmark key={coords[0]} coords={coords} />;
      })}
    </div>
  );
}

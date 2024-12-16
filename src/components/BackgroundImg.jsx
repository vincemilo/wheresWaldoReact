import MagnifyingGlass from "./MagnifyingGlass";
import DropDown from "./DropDown";

export default function BackgroundImg({
  handleClick,
  src,
  setImgSize,
  setShowMagnifier,
  setXY,
  modal,
  handleChange,
}) {
  return (
    <div className="image" onClick={handleClick}>
      <img
        src={src}
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
    </div>
  );
}

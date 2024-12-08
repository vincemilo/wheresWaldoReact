import MagnifyingGlass from "./MagnifyingGlass";
import DropDown from "./DropDown";

export default function BackgroundImg({
  handleClick,
  src,
  setImgSize,
  setShowMagnifier,
  setXY,
  x,
  y,
  imgWidth,
  modal,
  handleChange,
  xRatio,
  yRatio,
  selection,
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

      <div className="debugPanel">
        <div>Offset X Position: {x}</div>
        <div>Offset Y Position: {y}</div>
        <div>X Ratio: {xRatio}</div>
        <div>Y Ratio: {yRatio}</div>
        <div>Img Width: {imgWidth}</div>
        <div>Selection: {selection}</div>
      </div>
    </div>
  );
}

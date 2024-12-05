import MagnifyingGlass from "./MagnifyingGlass";
import DropDown from "./DropDown";

export default function BackgroundImg({
  handleClick,
  src,
  setImgSize,
  setShowMagnifier,
  setXY,
  showMagnifier,
  x,
  y,
  imgWidth,
  imgHeight,
  modal,
  handleChange,
  xRatio,
  yRatio,
  selection,
  magnifyingGlass,
  targetingBox,
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
      <MagnifyingGlass
        showMagnifier={showMagnifier}
        coords={{ x, y }}
        src={src}
        imgSize={{ w: imgWidth, h: imgHeight }}
        magnifyingGlass={magnifyingGlass}
      />
      <DropDown
        modal={modal}
        coords={{ x, y }}
        handleChange={handleChange}
        targetingBox={targetingBox}
      />

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

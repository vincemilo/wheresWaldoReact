import { useRef, useState, createContext } from "react";
import waldo from "../assets/waldo2.jpg";
import BackgroundImg from "./BackgroundImg";
import useFetch from "../useFetch";

export const MagnifierContext = createContext({
  coords: {},
  src: null,
  imgSize: {},
  showMagnifier: false,
  targetingBox: false,
  magnifierSettings: {},
});

export default function MousePosition() {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[xRatio, yRatio], setXYRatio] = useState([0, 0]);
  const modal = useRef(null);
  const [selection, setSelection] = useState(null);
  const [targetingBox, setTargetingBox] = useState(false);
  const { data, loading, error } = useFetch("http://localhost:3000/characters");
  const coords = { x, y };
  const src = waldo;
  const imgSize = { w: imgWidth, h: imgHeight };
  const magnifierSettings = {
    magHeight: 100,
    magWidth: 100,
    zoomLevel: imgSize.w < 500 ? 4 : imgSize.w > 1000 ? 2 : 3,
  };

  const handleClick = (e) => {
    setTargetingBox(true);
    setXYRatio([x / imgWidth, y / imgHeight]);
    if (!modal.current.open) modal.current.showModal();
    if (e.target.className === "modal") modal.current.close();
  };

  const handleChange = (e) => {
    setSelection(e.target.value);
    modal.current.close();
    setTargetingBox(false);
    console.log(data);
  };
  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      <MagnifierContext.Provider
        value={{
          coords,
          src,
          imgSize,
          showMagnifier,
          targetingBox,
          magnifierSettings,
        }}
      >
        <BackgroundImg
          handleClick={handleClick}
          src={waldo}
          setImgSize={setImgSize}
          setShowMagnifier={setShowMagnifier}
          setXY={setXY}
          showMagnifier={showMagnifier}
          x={x}
          y={y}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          modal={modal}
          handleChange={handleChange}
          xRatio={xRatio}
          yRatio={yRatio}
          selection={selection}
        />
      </MagnifierContext.Provider>
    </div>
  );
}

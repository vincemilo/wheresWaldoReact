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
    modal.current.close();
    setTargetingBox(false);
    validateSelection(e.target.value);
  };

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const validateSelection = (target) => {
    setSelection(target);
    if (data) {
      const result = data.find(({ name }) => name === target);
      if (
        Number(result.x_ratio) === round(xRatio) &&
        Number(result.y_ratio) === round(yRatio)
      ) {
        console.log("success");
      } else {
        console.log(typeof round(xRatio));
        console.log(typeof result.x_ratio);
        console.log("fail");
      }
    }
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
          modal={modal}
          handleChange={handleChange}
        />
      </MagnifierContext.Provider>
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

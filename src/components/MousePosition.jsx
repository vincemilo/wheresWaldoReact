import { useRef, useState } from "react";
import waldo from "../assets/waldo2.jpg";
import BackgroundImg from "./BackgroundImg";

export default function MousePosition() {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[xRatio, yRatio], setXYRatio] = useState([0, 0]);
  const modal = useRef(null);
  const [selection, setSelection] = useState(null);

  const handleClick = (e) => {
    setXYRatio([x / imgWidth, y / imgHeight]);
    if (!modal.current.open) modal.current.showModal();
    if (e.target.className === "modal") modal.current.close();
    if (e.target.className === "option") modal.current.close();
  };

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
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
    </div>
  );
}

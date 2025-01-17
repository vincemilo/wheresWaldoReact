import { useContext } from "react";
import { MagnifierContext } from "./MousePosition";

export default function MagnifyingGlass() {
  const { coords, src, imgSize, showMagnifier } = useContext(MagnifierContext);
  const [magHeight, magWidth, zoomLevel] = [
    100,
    100,
    imgSize.w < 500 ? 4 : imgSize.w > 1000 ? 2 : 3,
  ];
  if (showMagnifier)
    return (
      <div
        className="magnifyingGlass"
        style={{
          role: "region",
          position: "absolute",
          pointerEvents: "none",
          height: `${magHeight}px`,
          width: `${magWidth}px`,
          top: `${coords.y - magHeight / 2}px`,
          left: `${coords.x - magWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",

          //calculate zoomed image size
          backgroundSize: `${imgSize.w * zoomLevel}px ${
            imgSize.h * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-coords.x * zoomLevel + magWidth / 2}px`,
          backgroundPositionY: `${-coords.y * zoomLevel + magHeight / 2}px`,
        }}
      ></div>
    );
}

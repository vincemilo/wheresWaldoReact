import { useContext } from "react";
import { MagnifierContext } from "./MousePosition";

export default function Thumbnail() {
  const { coords, src, imgSize, targetingBox, magnifierSettings } =
    useContext(MagnifierContext);
  const { magHeight, magWidth, zoomLevel } = magnifierSettings;
  if (targetingBox)
    return (
      <div
        className="targeting-box"
        style={{
          height: `${magHeight}px`,
          width: `${magWidth}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid black",
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

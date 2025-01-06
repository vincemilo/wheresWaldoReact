import checkmark from "../assets/check.png";
import { useContext } from "react";
import { MagnifierContext } from "./MousePosition";

export default function Checkmark(coords) {
  console.log(coords);
  const { magnifierSettings, imgSize } = useContext(MagnifierContext);
  const { magHeight, magWidth } = magnifierSettings;
  return (
    <div
      className="checkmark"
      style={{
        top: `${imgSize.h}px`,
        left: `${imgSize.w}px`,
        position: "absolute",
      }}
    >
      <img
        src={checkmark}
        style={{
          height: `${magHeight / 2}px`,
          width: `${magWidth / 2}px`,
        }}
      />
    </div>
  );
}

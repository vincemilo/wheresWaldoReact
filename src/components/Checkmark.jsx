import checkmark from "../assets/check.png";
import { useContext } from "react";
import { MagnifierContext } from "./MousePosition";

export default function Checkmark(coords) {
  console.log(coords);
  const { magnifierSettings } = useContext(MagnifierContext);
  const { magHeight, magWidth } = magnifierSettings;
  return (
    <div
      className="checkmark"
      style={{
        top: `${coords.y - magHeight / 2}px`,
        left: `${coords.x - magWidth / 10}px`,
        position: "absolute",
      }}
    >
      <img
        src={checkmark}
        style={{ height: `${magHeight}px`, width: `${magWidth}px` }}
      />
    </div>
  );
}

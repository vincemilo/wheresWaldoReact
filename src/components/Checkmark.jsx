import checkmark from "../assets/check.png";
import { useContext } from "react";
import { MagnifierContext } from "./MousePosition";

export default function Checkmark({ coords }) {
  const { imgSize } = useContext(MagnifierContext);
  return (
    <div
      className="checkmark"
      style={{
        top: `${coords[1] * 99}%`,
        left: `${coords[0] * 99}%`,
        position: "absolute",
      }}
    >
      <img
        src={checkmark}
        style={{
          height: `${imgSize.h / 45}px`,
          width: `${imgSize.w / 45}px`,
        }}
      />
    </div>
  );
}

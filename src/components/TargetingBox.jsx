export default function TargetingBox({ coords, imgSize, isActive }) {
  let active = "targeting-box";
  if (isActive) active += " active";
  const boxStyle = {
    left: coords.x - 0.06 * imgSize.w,
    top: coords.y - 0.04 * imgSize.h,
  };
  return <div className={active} style={boxStyle} id="tBox"></div>;
}

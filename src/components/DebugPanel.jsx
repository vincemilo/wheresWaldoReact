export default function DebugPanel({
  x,
  y,
  xRatio,
  yRatio,
  imgHeight,
  imgWidth,
  selection,
  clientX,
  clientY,
}) {
  return (
    <div className="debugPanel">
      <div>Offset X Position: {x}</div>
      <div>Offset Y Position: {y}</div>
      <div>X Ratio: {xRatio}</div>
      <div>Y Ratio: {yRatio}</div>
      <div>Img Height: {imgHeight}</div>
      <div>Img Width: {imgWidth}</div>
      <div>Selection: {selection}</div>
      <div>ClientX: {clientX}</div>
      <div>ClientY: {clientY}</div>
    </div>
  );
}

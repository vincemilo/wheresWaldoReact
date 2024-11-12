export default function Canvas({ canvasRef }) {
  const handleClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.strokeRect(x - 25, y - 25, 50, 50);
  };

  return <canvas onClick={handleClick} ref={canvasRef}></canvas>;
}

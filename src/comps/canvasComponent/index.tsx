import useCanvas from "./hook";
export default function CanvasComponent() {
  const { canvasRef } = useCanvas();
  return <canvas ref={canvasRef} />;
}

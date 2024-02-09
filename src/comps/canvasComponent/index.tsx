import useCanvas from "./hook";
import EditModal from "../modal";
export default function CanvasComponent() {
  const {
    canvasRef,
    isModalOpen,
    setIsModalOpen,
    target,
    changeBoxHandler,
    deleteBoxHandler,
  } = useCanvas();

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      {isModalOpen && target && (
        <EditModal
          setIsModalOpen={setIsModalOpen}
          target={target}
          onUpdate={changeBoxHandler}
          onDelete={deleteBoxHandler}
        />
      )}
    </div>
  );
}

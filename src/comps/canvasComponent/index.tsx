import useCanvas from "./hook";
import EditModal from "../modal";
import Sidebar from "../canvasSideBar";
import styles from "./styles.module.scss";
export default function CanvasComponent() {
  const {
    canvasRef,
    isModalOpen,
    setIsModalOpen,
    target,
    changeBoxHandler,
    deleteBoxHandler,
    openModalHandler,
    boxes,
  } = useCanvas();

  return (
    <div className={styles.wrapper}>
      <Sidebar openModal={openModalHandler} boxes={boxes} />
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

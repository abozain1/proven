import { useEffect, useRef, useState } from "react";
import obj from "@/assets/task-object.json";
import { Box } from "@/types";

interface ColorMap {
  [key: string]: string;
}

const colorMap: ColorMap = {
  Name: "red",
  Description: "blue",
  Date: "green",
  Amount: "orange",
  Supplier: "purple",
  Number: "yellow",
};

export default function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [boxes, setBoxes] = useState<Box[]>(
    obj.boxes.map((box, indx) => ({ ...box, id: `id_${Date.now()}_${indx}` }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target, setTarget] = useState<null | Box>(null);
  function changeBoxHandler(params: Box) {
    setBoxes((prev) => {
      const index = prev.findIndex((box) => box.id === params.id);
      if (index === -1) return prev;
      const newBoxes = [...prev];
      newBoxes[index] = { ...newBoxes[index], ...params };
      return newBoxes;
    });
  }
  function openModalHandler(box: Box) {
    setTarget(box);
    setIsModalOpen(true);
  }
  function deleteBoxHandler(id: string) {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
  }
  const adjustCanvasSize = () => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const wrapperWidth = canvasRef.current.parentElement.offsetWidth;
      const canvasWidth = wrapperWidth * 0.8;
      const canvasHeight = window.innerHeight;

      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;

      const context = canvasRef.current.getContext("2d");
      if (context) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

          const gap = 10;
          const staticBoxWidth = 200;
          const staticBoxHeight = 100;
          const numCols = Math.floor(
            (canvasWidth - gap) / (staticBoxWidth + gap)
          );

          boxes.forEach((box, index) => {
            const row = Math.floor(index / numCols);
            const col = index % numCols;
            const x = col * (staticBoxWidth + gap) + gap;
            const y = row * (staticBoxHeight + gap) + gap;

            context.fillStyle = colorMap[box.class];
            context.fillRect(x, y, staticBoxWidth, staticBoxHeight);
            context.fillStyle = "black";
            context.fillText(box.text, x + 10, y + 30);
          });
        };
        image.src = obj.base64;
      }
    }
  };

  const onCanvasDoubleClick = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const numCols = 4;
    const gap = 10;
    const boxWidth = (canvas.width - (numCols + 1) * gap) / numCols;
    const boxHeight = 50;

    const clickedBox = boxes.find((box, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      const boxX = col * (boxWidth + gap) + gap;
      const boxY = row * (boxHeight + gap) + gap;

      return (
        x >= boxX && x <= boxX + boxWidth && y >= boxY && y <= boxY + boxHeight
      );
    });

    if (clickedBox) {
      openModalHandler(clickedBox);
    }
  };

  useEffect(() => {
    adjustCanvasSize();
    window.addEventListener("resize", adjustCanvasSize);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("dblclick", onCanvasDoubleClick);
    }

    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
      if (canvas) {
        canvas.removeEventListener("dblclick", onCanvasDoubleClick);
      }
    };
  }, [boxes]);

  return {
    canvasRef,
    isModalOpen,
    setIsModalOpen,
    target,
    changeBoxHandler,
    deleteBoxHandler,
    boxes,
    openModalHandler,
  };
}

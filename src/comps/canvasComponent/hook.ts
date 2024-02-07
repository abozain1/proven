import obj from "@/assets/task-object.json";
import { useEffect, useRef } from "react";
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

  const adjustCanvasSize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const context = canvas.getContext("2d");
      if (context && canvas.width && canvas.height) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const numCols = 4;
          const gap = 10;
          const boxWidth = (canvas.width - (numCols + 1) * gap) / numCols;
          const boxHeight = 50;

          obj.boxes.forEach((box, index) => {
            const row = Math.floor(index / numCols);
            const col = index % numCols;
            const x = col * (boxWidth + gap) + gap;
            const y = row * (boxHeight + gap) + gap;

            context.fillStyle = colorMap[box.class];
            context.fillRect(x, y, boxWidth, boxHeight);
            context.fillStyle = "black";
            context.fillText(box.text, x + 10, y + 30);
          });
        };
        image.src = obj.base64;
      }
    }
  };

  useEffect(() => {
    adjustCanvasSize();
    window.addEventListener("resize", adjustCanvasSize);

    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
    };
  }, [obj]);

  return { canvasRef };
}

import obj from "@/assets/task-object.json";
import { useEffect, useRef } from "react";

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

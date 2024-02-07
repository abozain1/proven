import obj from "@/assets/task-object.json";
import { useEffect, useRef } from "react";

export default function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0);
        };
        image.src = obj.base64;
      }
    }
  }, [obj]);
  return { canvasRef };
}

import { useEffect, useRef } from "react";
import "./BilliardGame.css";
import { getCanvasWidth, getCanvasHeight } from "../../utils/helpers";

interface IBall {
  x: number;
  y: number;
  radius: number;
}

const BilliardGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls: Array<IBall> = [
    { x: 300, y: 200, radius: 10 },
    { x: 200, y: 400, radius: 12 },
    { x: 100, y: 300, radius: 15 },
    { x: 600, y: 100, radius: 16 },
    { x: 100, y: 100, radius: 18 },
    { x: 600, y: 300, radius: 20 },
    { x: 400, y: 300, radius: 23 },
    { x: 400, y: 100, radius: 25 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "blue";
      ctx.shadowColor = "white";
      ctx.shadowBlur = 5;
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";

      balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, []);

  return (
    <div className="block-canvas">
      <canvas
        ref={canvasRef}
        width={getCanvasWidth()}
        height={getCanvasHeight()}
      />
    </div>
  );
};

export default BilliardGame;

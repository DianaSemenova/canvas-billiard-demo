/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import "./BilliardGame.css";
import {
  getContextCanvas,
  renderBalls,
  checkBorderCollision,
  checkBallCollision,
} from "../../utils/helpers";
import IBall from "../../types/types";

const BilliardGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls: Array<IBall> = [
    { id: 1, x: 300, y: 200, radius: 10, vx: 0, vy: 0, color: "#0000ff" },
    { id: 2, x: 200, y: 400, radius: 12, vx: 0, vy: 0, color: "#0000ff" },
    { id: 3, x: 100, y: 300, radius: 15, vx: 0, vy: 0, color: "#0000ff" },
    { id: 4, x: 600, y: 100, radius: 16, vx: 0, vy: 0, color: "#0000ff" },
    { id: 5, x: 100, y: 100, radius: 18, vx: 0, vy: 0, color: "#0000ff" },
    { id: 6, x: 600, y: 300, radius: 20, vx: 0, vy: 0, color: "#0000ff" },
    { id: 7, x: 400, y: 300, radius: 23, vx: 0, vy: 0, color: "#0000ff" },
    { id: 8, x: 400, y: 100, radius: 25, vx: 0, vy: 0, color: "#0000ff" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      getContextCanvas(ctx, canvas);

      const moveBallsOnMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();

        balls.forEach((ball) => {
          const dx = event.clientX - rect.left - ball.x;
          const dy = event.clientY - rect.top - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ball.radius) {
            const angle = Math.atan2(dy, dx);
            ball.vx = Math.cos(angle) * 1;
            ball.vy = Math.sin(angle) * 1;
          }
        });
      };

      const updateCanvas = () => {
        getContextCanvas(ctx, canvas);
        renderBalls(balls, ctx);

        balls.forEach((ball) => {
          checkBorderCollision(ball, canvas);

          balls.forEach((otherBall) => {
            if (ball !== otherBall) {
              checkBallCollision(ball, otherBall);
            }
          });
        });

        requestAnimationFrame(updateCanvas);
      };

      canvas.addEventListener("mousemove", moveBallsOnMouseMove);
      updateCanvas();

      return () => {
        canvas.removeEventListener("mousemove", moveBallsOnMouseMove);
      };
    }
  }, []);

  return (
    <div className="block-canvas">
      <canvas ref={canvasRef} width={900} height={500} />
    </div>
  );
};

export default BilliardGame;

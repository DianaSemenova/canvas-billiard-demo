/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from "react";
import "./BilliardGame.css";
import {
  renderBalls,
  checkBorderCollision,
  checkBallCollision,
} from "../../utils/helpers";
import { IBall, IProps } from "../../types/types";

const BilliardGame = ({ menuDisplay, setMenuDisplay }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<IBall[]>([
    { id: 2, x: 600, y: 300, radius: 16, vx: 0, vy: 0, color: "#0000ff" },
    { id: 3, x: 100, y: 300, radius: 20, vx: 0, vy: 0, color: "#0000ff" },
    { id: 4, x: 600, y: 100, radius: 22, vx: 0, vy: 0, color: "#0000ff" },
    { id: 5, x: 100, y: 100, radius: 25, vx: 0, vy: 0, color: "#0000ff" },
    { id: 7, x: 400, y: 300, radius: 28, vx: 0, vy: 0, color: "#0000ff" },
    { id: 8, x: 400, y: 100, radius: 32, vx: 0, vy: 0, color: "#0000ff" },
  ]);

  const handleBallClick = useCallback(
    (id: number) => {
      setMenuDisplay({ ballColor: null, ballId: id, isShowMenu: true });
    },
    [menuDisplay, setMenuDisplay]
  );

  const updateColorBall = useCallback(() => {
    setBalls(
      balls.map((ball) => {
        if (
          ball.id === menuDisplay.ballId &&
          typeof menuDisplay.ballColor === "string"
        ) {
          return { ...ball, color: menuDisplay.ballColor };
        }
        return ball;
      })
    );
  }, [menuDisplay.ballId, menuDisplay.ballColor]);

  useEffect(() => {
    if (menuDisplay.ballId && menuDisplay.ballColor) {
      updateColorBall();
    }
  }, [updateColorBall]);

  const getContextCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "blue";
      ctx.shadowColor = "white";
      ctx.shadowBlur = 5;
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    },
    [balls]
  );

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
        renderBalls(balls, ctx, canvas, handleBallClick);

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
  }, [getContextCanvas]);

  return (
    <div className="block-canvas">
      <canvas ref={canvasRef} width={900} height={500} />
    </div>
  );
};

export default BilliardGame;

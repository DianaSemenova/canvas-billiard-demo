import { IBall } from "../types/types";

const renderBalls = (
  balls: Array<IBall>,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  handleBallClick: (id: number) => void
) => {
  const handleClick = (event: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball) => {
      if (
        Math.sqrt(
          Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2)
        ) <= ball.radius
      ) {
        handleBallClick(ball.id);
      }
    });
  };

  canvas.addEventListener("click", handleClick);

  balls.forEach((ball) => {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();

    ball.x += ball.vx;
    ball.y += ball.vy;
  });

  return () => {
    canvas.removeEventListener("click", handleClick);
  };
};

const checkBorderCollision = (ball: IBall, canvas: HTMLCanvasElement) => {
  const { x, y, radius, vx, vy } = ball;
  const { width, height } = canvas;

  if (x + radius >= width) {
    ball.x = width - radius;
    ball.vx = -vx;
  }

  if (x - radius <= 0) {
    ball.x = radius;
    ball.vx = -vx;
  }

  if (y + radius >= height) {
    ball.y = height - radius;
    ball.vy = -vy;
  }

  if (y - radius <= 0) {
    ball.y = radius;
    ball.vy = -vy;
  }
};

const checkBallCollision = (ballA: IBall, ballB: IBall) => {
  const dx = ballB.x - ballA.x;
  const dy = ballB.y - ballA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ballA.radius + ballB.radius) {
    const angle = Math.atan2(dy, dx);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const x1 = 0;
    const y1 = 0;

    const x2 = dx * cos + dy * sin;
    const y2 = dy * cos - dx * sin;

    const vx1 = ballA.vx * cos + ballA.vy * sin;
    const vy1 = ballA.vy * cos - ballA.vx * sin;
    const vx2 = ballB.vx * cos + ballB.vy * sin;
    const vy2 = ballB.vy * cos - ballB.vx * sin;

    const vx1Final =
      ((ballA.radius - ballB.radius) * vx1 + 2 * ballB.radius * vx2) /
      (ballA.radius + ballB.radius);
    const vx2Final =
      ((ballB.radius - ballA.radius) * vx2 + 2 * ballA.radius * vx1) /
      (ballA.radius + ballB.radius);
    const vy1Final = vy1;
    const vy2Final = vy2;

    const x1Final = x1 * cos - y1 * sin;
    const y1Final = y1 * cos + x1 * sin;
    const x2Final = x2 * cos - y2 * sin;
    const y2Final = y2 * cos + x2 * sin;

    ballA.x = ballA.x + (x1Final - x1);
    ballA.y = ballA.y + (y1Final - y1);
    ballB.x = ballB.x + (x2Final - x2);
    ballB.y = ballB.y + (y2Final - y2);

    ballA.vx = vx1Final * cos - vy1Final * sin;
    ballA.vy = vy1Final * cos + vx1Final * sin;
    ballB.vx = vx2Final * cos - vy2Final * sin;
    ballB.vy = vy2Final * cos + vx2Final * sin;
  }
};

export { renderBalls, checkBorderCollision, checkBallCollision };

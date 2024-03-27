const getCanvasWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return 600;
  } else {
    return 900;
  }
};

const getCanvasHeight = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return 400;
  } else {
    return 500;
  }
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min - 2 * min + 1)) + min;
};

export { getCanvasWidth, getCanvasHeight, generateRandomNumber };

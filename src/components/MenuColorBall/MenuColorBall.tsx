import "./MenuColorBall.css";

const MenuColorBall = () => {
  const colors: Array<string> = ["#ffff00", "#008000", "#9314ff"];
  return (
    <div className="block-menu">
      <h2 className="block-menu__title">Выберите цвет шара:</h2>
      {colors.map((color) => (
        <button
          className="block-menu__button"
          type="button"
          style={{ background: color }}
        >
          {color}
        </button>
      ))}
    </div>
  );
};

export default MenuColorBall;

import "./MenuColorBall.css";
import CloseSvg from "./CloseSvg/CloseSvg";

const MenuColorBall = () => {
  const colors: Array<string> = ["#ffff00", "#008000", "#9314ff", "#0000ff"];
  return (
    <div className="block-menu">
      <div className="block-menu-content">
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
        <CloseSvg />
      </div>
    </div>
  );
};

export default MenuColorBall;

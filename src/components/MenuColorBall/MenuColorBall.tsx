import "./MenuColorBall.css";
import CloseSvg from "./CloseSvg/CloseSvg";
import { IProps } from "../../types/types";

const MenuColorBall = ({ menuDisplay, setMenuDisplay }: IProps) => {
  const colors: Array<string> = ["#ffff00", "#008000", "#9314ff", "#0000ff"];

  const clickCloseMenu = () => {
    setMenuDisplay({ ballId: null, ballColor: null, isShowMenu: false });
  };

  const setColorBall = (color: string) => {
    setMenuDisplay({ ...menuDisplay, ballColor: color });
  };

  return (
    <div className="block-menu">
      <div className="block-menu-content">
        <h2 className="block-menu__title">Выберите цвет шара:</h2>
        {colors.map((color) => (
          <button
            key={color}
            className="block-menu__button"
            type="button"
            style={{ background: color }}
            onClick={() => setColorBall(color)}
          >
            {color}
          </button>
        ))}
        <button className="block-menu__buttonSvg" onClick={clickCloseMenu}>
          <CloseSvg />
        </button>
      </div>
    </div>
  );
};

export default MenuColorBall;

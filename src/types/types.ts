export interface IBall {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

export interface IMenuDisplay {
  ballId: number | null;
  ballColor: string | null;
  isShowMenu: boolean;
}

export interface IProps {
  menuDisplay: IMenuDisplay;
  setMenuDisplay: React.Dispatch<React.SetStateAction<IMenuDisplay>>;
}

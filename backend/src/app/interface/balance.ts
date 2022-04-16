import { EAwardTypes } from "../enum";

export interface IBalance {
  [EAwardTypes.COOKIE]: number;
  [EAwardTypes.GLASS_OF_MILK]: number;
}

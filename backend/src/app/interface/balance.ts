import { AwardTypes } from "../enum";

export interface IBalance {
  [AwardTypes.COOKIE]: number;
  [AwardTypes.GLASS_OF_MILK]: number;
}

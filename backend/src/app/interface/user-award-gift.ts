import { EAwardTypes } from "../enum";

export interface IUserAwardGift {
  gift: string;
  user: string;
  type: EAwardTypes;
}

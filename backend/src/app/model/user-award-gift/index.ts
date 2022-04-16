import mongoose from "mongoose";
import { DB_USER_AWARD_GIFT_MODEL } from "../../constants";
import {
  IUserAwardGiftModel,
  IUserAwardGiftDoc,
  UserAwardGiftSchema,
} from "./user-award-gift-schema";

const UserAwardGifts: IUserAwardGiftModel = mongoose.model<
  IUserAwardGiftDoc,
  IUserAwardGiftModel
>(DB_USER_AWARD_GIFT_MODEL, UserAwardGiftSchema, DB_USER_AWARD_GIFT_MODEL);

export { IUserAwardGiftDoc, UserAwardGifts };

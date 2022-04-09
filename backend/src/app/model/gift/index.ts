import mongoose from "mongoose";
import { DB_GIFT_MODEL } from "../../constants";
import { IGiftModel, IGiftDoc, GiftSchema } from "./gift-schema";

const Gifts: IGiftModel = mongoose.model<IGiftDoc, IGiftModel>(
  DB_GIFT_MODEL,
  GiftSchema,
  DB_GIFT_MODEL
);

export { IGiftDoc, Gifts };

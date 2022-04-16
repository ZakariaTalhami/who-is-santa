import { Schema, Document, Model } from "mongoose";
import { DB_GIFT_MODEL, DB_USER_MODEL } from "../../constants";
import { awardTypes } from "../../enum";
import { IUserAwardGift } from "../../interface/user-award-gift";

interface IUserAwardGiftDoc extends IUserAwardGift, Document {
  createAt: Date;
  updatedAt: Date;
}

interface IUserAwardGiftModel extends Model<IUserAwardGiftDoc> {}

const UserAwardGiftSchema = new Schema<IUserAwardGiftDoc>(
  {
    user: {
      type: String,
      ref: DB_USER_MODEL,
      required: true,
    },
    gift: {
      type: String,
      ref: DB_GIFT_MODEL,
      required: true,
    },
    type: {
      type: String,
      enum: awardTypes,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IUserAwardGiftDoc, IUserAwardGiftModel, UserAwardGiftSchema };

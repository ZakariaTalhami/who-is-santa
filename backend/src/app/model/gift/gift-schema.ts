import { Schema, Document, Model } from "mongoose";
import { DB_USER_MODEL } from "../../constants";
import { IGift } from "../../interface/gift";

interface IGiftDoc extends IGift, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface IGiftModel extends Model<IGiftDoc> {}

const GiftSchema = new Schema<IGiftDoc>(
  {
    user: {
      type: String,
      ref: DB_USER_MODEL,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    awardedCookie: {
      type: Number,
      default: 0,
    },
    awardedGlassOfMilk: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export { IGiftDoc, IGiftModel, GiftSchema };

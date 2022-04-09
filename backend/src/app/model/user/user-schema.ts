import { Schema, Document, Model } from "mongoose";
import {
  USER_DAILY_COOKIE_ALLOWANCE,
  USER_DAILY_MILK_ALLOWANCE,
} from "../../constants";
import { IUser } from "../../interface/user";

interface IUserDoc extends IUser, Document {
  createAt: Date;
  updatedAt: Date;
}

interface IUserModel extends Model<IUserDoc> {}

const UserSchema = new Schema<IUserDoc>(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    balance: {
      type: {
        cookie: Number,
        glassOfMilk: Number,
      },
      default: {
        cookie: USER_DAILY_COOKIE_ALLOWANCE,
        glassOfMilk: USER_DAILY_MILK_ALLOWANCE,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._v;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

export { IUserDoc, IUserModel, UserSchema };

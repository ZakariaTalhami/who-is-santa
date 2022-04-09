import { Schema, Document, Model } from "mongoose";
import {
  USER_DAILY_COOKIE_ALLOWANCE,
  USER_DAILY_MILK_ALLOWANCE,
} from "../../constants";
import { IUser } from "../../interface/user";
import { encryptPassword } from "../../utils/password-encryption";

interface IUserDoc extends IUser, Document {
  createAt: Date;
  updatedAt: Date;
  generateToken: () => string;
}

interface IUserModel extends Model<IUserDoc> {}

const UserSchema = new Schema<IUserDoc>(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
      _id: false,
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

UserSchema.pre("save", async function (done) {
  if (this.isNew) {
    if (this.isModified("password")) {
      this.password = await encryptPassword(this.password);
    }
  }

  done();
});

export { IUserDoc, IUserModel, UserSchema };

import mongoose from "mongoose";
import { IUserDoc, IUserModel, UserSchema } from "./user-schema";
import { generateToken } from "../../utils/jwt-token-utils";
import { DB_USER_MODEL } from "../../constants";

UserSchema.methods.generateToken = function (this: IUserDoc) {
  return generateToken({
    _id: this._id,
    email: this.email,
    username: this.username,
  })
}

const Users: IUserModel = mongoose.model<IUserDoc, IUserModel>(
  DB_USER_MODEL,
  UserSchema,
  DB_USER_MODEL
);

export { IUserDoc, Users };

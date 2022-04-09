import mongoose from "mongoose";
import { IUserDoc, IUserModel, UserSchema } from "./user-schema";
import { generateToken } from "../../utils/jwt-token-utils";

UserSchema.methods.generateToken = function (this: IUserDoc) {
  return generateToken({
    _id: this._id,
    email: this.email,
    username: this.username,
  })
}

const Users: IUserModel = mongoose.model<IUserDoc, IUserModel>(
  "Users",
  UserSchema,
  "Users"
);

export { IUserDoc, Users };

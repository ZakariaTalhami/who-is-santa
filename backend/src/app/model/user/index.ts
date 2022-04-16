import mongoose from "mongoose";
import { IUserDoc, IUserModel, UserSchema } from "./user-schema";
import { generateToken } from "../../utils/jwt-token-utils";
import { DB_USER_MODEL } from "../../constants";
import { IUserTokenPayload } from "../../interface/user";
import { EAwardTypes } from "../../enum";

UserSchema.methods.generateToken = function (this: IUserDoc) {
  const payload: IUserTokenPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
  };
  return generateToken(payload);
};

UserSchema.methods.hasBalance = function (this: IUserDoc, type: EAwardTypes) {
  return this.balance[type] > 0;
}

const Users: IUserModel = mongoose.model<IUserDoc, IUserModel>(
  DB_USER_MODEL,
  UserSchema,
  DB_USER_MODEL
);

export { IUserDoc, Users };

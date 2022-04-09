import mongoose from "mongoose";
import { IUserDoc, IUserModel, UserSchema } from "./user-schema";

const Users = mongoose.model<IUserDoc, IUserModel>(
  "Users",
  UserSchema,
  "Users"
);

export { IUserDoc, Users };

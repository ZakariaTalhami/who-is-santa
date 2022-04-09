import { IBalance } from "./balance";

export interface IUser {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  balance: IBalance;
}

export interface IUserDto {
  username: string;
  email: string;
  password: string;
}

import { EAwardTypes } from "../enum";
import { IUserDto, IUserLoginDto } from "../interface/user";
import { Users } from "../model/user";
import { comparePasswords } from "../utils/password-encryption";

const createNewUser = async (userData: IUserDto) => {
  if (await doesUserExistByEmail(userData.email)) {
    throw new Error(`User with email ${userData.email} already exists`);
  }

  const user = await Users.create(userData);

  return user;
};

const doesUserExistByEmail = async (email: string) => {
  return await Users.exists({
    email,
  });
};

const findUserByEmail = async (email: string) => {
  return Users.findOne({
    email,
  });
};

const findUserById = async (userId: string) => {
  return Users.findById(userId);
};

const loginUser = async (userData: IUserLoginDto) => {
  const user = await findUserByEmail(userData.email);
  if (!user) {
    throw new Error(`User with email ${userData.email} doesnt exist`);
  }

  if (!(await comparePasswords(userData.password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return user.generateToken();
};

const decreaseUserBalance = async (
  userId: string,
  type: EAwardTypes,
  amount: number = 1
): Promise<boolean> => {
  const result = await Users.updateOne(
    {
      id: userId,
      [`balance.${type}`]: { $gt: 0 },
    },
    {
      $inc: {
        [`balance.${type}`]: amount * -1,
      },
    }
  );

  return result.modifiedCount > 0;
};

export {
  createNewUser,
  doesUserExistByEmail,
  findUserByEmail,
  findUserById,
  loginUser,
  decreaseUserBalance,
};

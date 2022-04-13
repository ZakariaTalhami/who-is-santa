import { UserAlreadyGiftTodayError } from "../error/already-gifted-today-error";
import { IGiftDto } from "../interface/gift";
import { Gifts } from "../model/gift";
import { getStartOfToday } from "../utils/date-utils";

const createNewGift = async (giftData: IGiftDto) => {
  if (!(await canUserGift(giftData.user))) {
    throw new UserAlreadyGiftTodayError(giftData.user);
  }

  const gift = await Gifts.create(giftData);

  return gift;
};

const getTodayGifts = async () => {
  const todaysDate = getStartOfToday();

  return Gifts.find({
    createAt: {
      $gte: todaysDate,
    },
  })
};

const canUserGift = async (userId: string) => {
  return !(await hasGiftedForToday(userId));
};

const hasGiftedForToday = async (userId: string): Promise<boolean> => {
  const todaysDate = getStartOfToday();

  const doesGiftExist = await Gifts.exists({
    user: userId,
    createAt: {
      $gte: todaysDate,
    },
  });

  return !!doesGiftExist;
};

export { createNewGift, canUserGift, getTodayGifts };

import { info } from "console";
import { QuerySelector, FilterQuery } from "mongoose";
import { UserAlreadyGiftTodayError } from "../error/already-gifted-today-error";
import { ICreatedDateRangeQuery } from "../interface/common";
import { IGiftDto } from "../interface/gift";
import { Gifts, IGiftDoc } from "../model/gift";
import { getStartOfToday } from "../utils/date-utils";

const logger = console;

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
    createdAt: {
      $gte: todaysDate,
    },
  });
};

const getGiftsByDateRange = async ({
  createdAtStart,
  createdAtEnd,
}: ICreatedDateRangeQuery) => {
  logger.info(`Getting Gifts in range [${createdAtStart},${createdAtEnd}]`);

  const filerQuery: FilterQuery<IGiftDoc> = {};
  const dateRangeQuery: QuerySelector<Date> = {};
  if (createdAtStart) dateRangeQuery.$gte = createdAtStart;
  if (createdAtEnd) dateRangeQuery.$lte = createdAtEnd;

  if (Object.keys(dateRangeQuery).length > 0) {
    filerQuery.createdAt = dateRangeQuery;
  }

  return Gifts.find(filerQuery);
};

const canUserGift = async (userId: string) => {
  return !(await hasGiftedForToday(userId));
};

const hasGiftedForToday = async (userId: string): Promise<boolean> => {
  const todaysDate = getStartOfToday();

  const doesGiftExist = await Gifts.exists({
    user: userId,
    createdAt: {
      $gte: todaysDate,
    },
  });

  return !!doesGiftExist;
};

export { createNewGift, canUserGift, getTodayGifts, getGiftsByDateRange };

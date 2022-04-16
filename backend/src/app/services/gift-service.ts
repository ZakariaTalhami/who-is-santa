import { QuerySelector, FilterQuery } from "mongoose";
import { EAwardTypes } from "../enum";
import { UserAlreadyGiftTodayError } from "../error/already-gifted-today-error";
import { ICreatedDateRangeQuery } from "../interface/common";
import { IGiftDto } from "../interface/gift";
import { Gifts, IGiftDoc } from "../model/gift";
import { getStartOfToday } from "../utils/date-utils";
import { capitalize } from "../utils/string-utils";

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

const findGiftById = async (giftId: string) => {
  return Gifts.findById(giftId);
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

const awardGift = async (giftId: string, type: EAwardTypes, amount: number = 1) => {
  const result = await Gifts.updateOne({
    id: giftId,
  }, {
    $inc: {
      [`awarded${capitalize(type)}`]: amount
    }
  });

  return result.modifiedCount > 0;
}

export {
  createNewGift,
  findGiftById,
  canUserGift,
  getTodayGifts,
  getGiftsByDateRange,
  awardGift
};

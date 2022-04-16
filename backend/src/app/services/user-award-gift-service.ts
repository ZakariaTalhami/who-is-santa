import { EAwardTypes } from "../enum";
import { UserAwardGifts } from "../model/user-award-gift";

const hasUserAwardedGift = async (userId: string, giftId: string ): Promise<boolean> => {
    return !!await UserAwardGifts.exists({
        gift: giftId,
        user: userId
    })
}

const trackUserAwardedGift = async (
  userId: string,
  giftId: string,
  type: EAwardTypes
) => {
  const userAwardedGift = await UserAwardGifts.create({
    gift: giftId,
    user: userId,
    type,
  });

  return userAwardedGift;
};

export { trackUserAwardedGift, hasUserAwardedGift };

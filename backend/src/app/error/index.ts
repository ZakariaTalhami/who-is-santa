import { UserAlreadyAwardedGiftError } from "./already-awarded-gift-error";
import { UserAlreadyGiftTodayError } from "./already-gifted-today-error";
import { UserCantAwardOwnGiftError } from "./cant-award-own-gift-error";
import { HttpUnauthorizedError } from "./http-unauthorized-error";
import { InsufficientBalaneError } from "./insufficient-balance-error";
import { HttpNotFoundError } from "./not-found-http-error";

export const HttpErrors = {
    UserAlreadyAwardedGiftError,
    UserAlreadyGiftTodayError,
    UserCantAwardOwnGiftError,
    HttpUnauthorizedError,
    InsufficientBalaneError,
    HttpNotFoundError
    
} as const;
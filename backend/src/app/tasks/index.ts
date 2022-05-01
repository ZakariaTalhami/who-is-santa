import Agenda from 'agenda';
import { USER_DAILY_COOKIE_ALLOWANCE, USER_DAILY_MILK_ALLOWANCE } from '../constants';
import { Users } from '../model/user';

export enum ETASks {
  DAILY_COOKIE_BALANCE = "DAILY_COOKIE_BALANCE",
}

const dailyCookieBalanceHandler = async () => {
    console.log("------------- dailyCookieBalanceHandler | Starting task");
    await Users.updateMany({isActive: true}, {
        $set: {
            // isActive: false
            balance: {
                cookie: USER_DAILY_COOKIE_ALLOWANCE,
                glassOfMilk: USER_DAILY_MILK_ALLOWANCE,
            }
        }
    });
    console.log("------------- dailyCookieBalanceHandler | Completed task");
}

export const initDailyCookieBalanceTask = (agenda: Agenda) => {
    console.log(`------------ Scheduler: Initializing ${ETASks.DAILY_COOKIE_BALANCE} task  ------------`);
    agenda.define(ETASks.DAILY_COOKIE_BALANCE, dailyCookieBalanceHandler)

    agenda.every("1 minutes", ETASks.DAILY_COOKIE_BALANCE);
};

import Agenda from "agenda";
import mongoose from "mongoose";
import { initDailyCookieBalanceTask } from "../app/tasks";

export const initAgendaScheduler = async () => {
    console.log(`------------ Initializing Scheduler  ------------`);

    const agenda = new Agenda();
    agenda.mongo(mongoose.connection.db);

    initDailyCookieBalanceTask(agenda);

    agenda.start();
}
import dotenv from "dotenv";
import { initAgendaScheduler } from "./boot/agenda-scheduler";
import { initializeMongoDB } from "./boot/db-connection";
dotenv.config();

const boot = async () => {
  await initializeMongoDB();
  await initAgendaScheduler();
};

const startServer = async () => {
  const { app } = await import("./app");

  const port: number = parseInt(process.env.PORT as string, 10) || 3000;

  app.listen(port, () => {
    console.log(`------------ Listening on port ${port} ------------`);
  });
};

(async () => {
  try {
    await boot();
    await startServer();
  } catch (error: any) {
    console.log(`Failed to boot... | ${error}`);
    console.log(error);
  }
})();

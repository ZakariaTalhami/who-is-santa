import express, { json, NextFunction, Request, Response } from "express";
import mainRouter from "./app/api";

const app = express();

app.use(json());

// Set up routes
app.use(mainRouter)

// Fallback
app.all("*", async (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app };

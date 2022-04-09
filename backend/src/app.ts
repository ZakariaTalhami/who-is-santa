import express, { json, NextFunction, Request, Response } from "express";
import bearerToken from "express-bearer-token";
import mainRouter from "./app/api";
import { HttpErrorHandlerMiddleware } from "./app/middleware/http-error-handler";

const app = express();

app.use(json());
app.use(bearerToken());

// Set up routes
app.use(mainRouter);

// Fallback
app.all("*", async (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// HTTP error handling
app.use(HttpErrorHandlerMiddleware);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export { app };

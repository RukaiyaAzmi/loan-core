import "reflect-metadata";
import * as http from "http";
import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import * as path from "path";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error-handler.middle";
import { pgConnect } from "./db/factory/connection.db";

// importing modules
import * as roleModule from "./modules/role";

export default async function appFactory(): Promise<Application> {
  // express app init
  const app: Application = express();

  // enabling cors
  app.use(cors());

  // body parser config
  const jsonParser: any = json({
    inflate: true,
    limit: "10mb",
    type: "application/json",
    verify: (
      req: http.IncomingMessage,
      res: http.ServerResponse,
      buf: Buffer,
      encoding: string
    ) => {
      // place for sniffing raw request
      return true;
    },
  });

  // using json parser and urlencoder
  app.use(jsonParser);
  app.use(urlencoded({ extended: true }));

  // enabling loggin of HTTP request using morgan
  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));

  // for handling uncaught exception from application
  process.on("uncaughtException", (err) => {
    console.error("[ERROR] Uncaught Exception : ", err.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (error) => {
    console.error("[ERROR] From event: ", error?.toString());
    process.exit(1);
  });

  //connection

  await pgConnect.getConnection("master");
  await pgConnect.getConnection("slave");

  /**
   * Register Modules
   */
  roleModule.init(app);

  /**
   * Register Error Handler
   */
  app.use(errorHandler);

  return app;
}

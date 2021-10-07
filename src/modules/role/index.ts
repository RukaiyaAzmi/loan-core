import { Application } from "express";
import featureRouter from "./routes/feature.route";

export function init(app: Application) {
  // feature management
  app.use("/role/feature", featureRouter);
}

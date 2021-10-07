import express, { Router, Request, Response, NextFunction } from "express";
import IdCheckError from "../../../errors/IdCheck.error";
import { IdCheck } from "../services/feature.service";


var count: number = 0;
export const IdCheckValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  const id: string = req.params.id;
  const count = await IdCheck(id);
  console.log("parent id middleware"+count);
  if (count==0) {
    next(new IdCheckError("Id does not found"));
  }
  else {
    next();
  }
};

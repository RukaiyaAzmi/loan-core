import ParentIdCheckError from "../../../errors/parrentId.error";
import express, { Router, Request, Response, NextFunction } from "express";
import { ParentKeyCheck } from "../services/feature.service";



//unique check for the update field value 
var count: number = 0;
export const ParentIdCheckValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  const parent_id: string = req.body.parent_id;
  const count = await ParentKeyCheck(parent_id);
  console.log("parent id middleware"+count);
  if (count==0) {
    next(new ParentIdCheckError("Parent Id does not found"));
  }
  else {
    next();
  }
};

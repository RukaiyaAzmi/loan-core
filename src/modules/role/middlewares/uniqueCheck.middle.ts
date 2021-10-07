import UniqueCheckError from "../../../errors/unique.error";
import express, { Router, Request, Response, NextFunction } from "express";
import { uniqueCheckUpdate } from "../services/feature.service";



//unique check for the update field value 
var count: number = 0;
export const UniqueCheckValidationUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feature_name: string = req.body.feature_name;
  const feature_code: string = req.body.feature_code;
  const feature_id: number = +req.params.id;
  console.log("error_feature_name" + feature_name);
 const count = await uniqueCheckUpdate(feature_name,feature_code,feature_id);
  console.log("middle uni " + count[0]);
  if (count[0] > 0 && count[1]==0) {
    console.log("hi iam here");
    next(new UniqueCheckError("Feature Name must be unique"));
  } 
  else if (count[0]== 0 && count[1]>0 ){
    next(new UniqueCheckError(" Feature Code must be unique"));

  }

  else if(count[0]> 0 && count[1]>0){
    next(new UniqueCheckError("Feature Name and Feature Code must be unique"));
  }
  else {
    next();
  }
};

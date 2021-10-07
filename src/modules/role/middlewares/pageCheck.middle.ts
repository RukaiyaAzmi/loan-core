import { Request, Response, NextFunction } from "express";
const PageCheckError = require("../../../errors/paginationPage.error");

export const pageCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var page: number = Number(req.query.page);
  var limit: number = Number(req.query.limit);

  if (page <= 0 || limit <= 0) {
    var err: any = new Error(
      "Page number or Limit can not be zero or negative"
    );
  } else {
    err = null;
  }

  if (err) {
    const pageError = new PageCheckError(err.message);
    next(pageError);
  } else {
    next();
  }
};

import CustomError from '../errors/custom.error';
import { Request, Response, NextFunction } from 'express';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        })
    }
    console.error(err);
    return res.status(500).json({
        errors: [{ message: 'Something went wrong' }]
    })
}

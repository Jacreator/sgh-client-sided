import { Response, Request, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';

export const validationMw = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const output: any = plainToInstance(dtoClass, req.body);
            validate(output, { skipMissingProperties: true }).then((errors: any) => {
                // errors is an array of validation errors
                if (errors.length > 0) {
                    console.log(errors);
                    let errorTexts = Array();
                    for (const errorItem of errors) {
                        errorTexts = errorTexts.concat(errorItem.constraints);
                    }
                    throw new ApiError(httpStatus.BAD_REQUEST, errorTexts.toString());
                } else {
                    res.locals.input = output;
                    next();
                }
            });
        } catch (error) {
            next(error);
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    };
};
import { User } from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import httpStatus from "http-status";

export const ComplianceMiddleware = async (req: any, res: any, next: any) => {

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(httpStatus.NOT_FOUND).json(
            {
                code: httpStatus.NOT_FOUND,
                message: 'User not found'
            });
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // user not authorized
    if (user.roles.includes('compliance')) {
        next();
    } else {
        res.status(httpStatus.UNAUTHORIZED).json(
            {
                code: httpStatus.UNAUTHORIZED,
                message: 'User not authorized'
            });
    }
};
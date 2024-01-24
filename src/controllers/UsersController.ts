import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { UsersService } from '@/services/UserService';

export class UsersController {
  private userService: any;
  constructor() {
    this.userService = new UsersService();
  }
  /**
   * Get all users for admin private function
   *
   * @param {any} type
   * @route GET /api/v1/admin/users/
   *
   * @return {UsersController}
   * @memberOf UsersController
   */
  getAllUsers = async (req: any, res: any, next: any) => {
    try {
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'All users',
        data: await this.userService.getAllUser(),
      });
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  };

  /**
   * Get User details for admin
   *
   * @route GET /api/v1/admin/user?id=:id
   *
   * @memberOf UsersController
   * @returns {Promise<User>}
   */
  getUserById = async (req: any, res: any, next: any) => {
    try {
      const { id } = req.query;

      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'users details',
        data: await this.userService.getUserById(id),
      });
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
  };

  create = async (req: any, res: any, next: any) => {
    try {
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'user added to library',
        data: await this.userService.create(req.body),
      });
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
  };

  borrowBook = async (req: any, res: any) => {
    try {
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'user added to library',
        data: await this.userService.handleBookAction(req.body),
      });
    } catch (error) {}
  };
}

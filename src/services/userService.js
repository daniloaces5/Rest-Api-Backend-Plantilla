import { userRepository } from '../repositories/userRepository.js';
import { AppError } from '../utils/appError.js';

export const userService = {
  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
};

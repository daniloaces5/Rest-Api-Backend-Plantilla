import { AppError } from '../utils/appError.js';
import { verifyToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/userRepository.js';

export const requireAuth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new AppError('Unauthorized', 401);

    const payload = verifyToken(token);
    const user = await userRepository.findById(payload.sub);
    if (!user) throw new AppError('Unauthorized', 401);

    req.user = { id: user.id, email: user.email, role: user.role };
    return next();
  } catch (err) {
    return next(new AppError('Unauthorized', 401));
  }
};

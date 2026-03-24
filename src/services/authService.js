import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository.js';
import { AppError } from '../utils/appError.js';
import { signToken } from '../utils/jwt.js';

const SALT_ROUNDS = 12;

export const authService = {
  async register({ email, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new AppError('Email already registered', 409);

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create({ email, passwordHash });
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return { user, token };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('Invalid credentials', 401);

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new AppError('Invalid credentials', 401);

    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return {
      user: { id: user.id, email: user.email, role: user.role },
      token
    };
  }
};

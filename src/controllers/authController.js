import { asyncHandler } from '../utils/asyncHandler.js';
import { authService } from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const result = await authService.register({ email, password });
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const result = await authService.login({ email, password });
  res.json(result);
});

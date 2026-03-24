import { asyncHandler } from '../utils/asyncHandler.js';
import { userService } from '../services/userService.js';

export const me = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user.id);
  res.json({ user });
});

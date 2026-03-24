import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares/validate.js';
import { login, register } from '../controllers/authController.js';

const router = Router();

const authSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(8).max(128)
  })
});

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);

export default router;

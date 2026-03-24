import { AppError } from '../utils/appError.js';

export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    const details = result.error.flatten();
    return next(new AppError('Validation error', 422, details));
  }

  req.validated = result.data;
  return next();
};

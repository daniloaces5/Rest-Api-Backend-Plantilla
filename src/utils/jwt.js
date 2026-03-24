import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.js';

export const signToken = (payload) =>
  jwt.sign(payload, appConfig.jwt.secret, {
    expiresIn: appConfig.jwt.expiresIn,
    issuer: appConfig.jwt.issuer,
    audience: appConfig.jwt.audience
  });

export const verifyToken = (token) =>
  jwt.verify(token, appConfig.jwt.secret, {
    issuer: appConfig.jwt.issuer,
    audience: appConfig.jwt.audience
  });

import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/HTTP.exception.js";
import { blacklistModel } from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";

interface jwtPayload {
  id: string;
}

export const verifyToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.userToken;
  if (!token) 
    throw new UnauthorizedException("User not logged in");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload;
  } catch (err) {
    throw new UnauthorizedException("Wrong token- Acess Denied");
  }

  req.user = decoded;
  next();
};

export const blacklistToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.userToken;
  if (!token) 
    throw new UnauthorizedException("No Token");

  const blacklistedToken = await blacklistModel.findOne({ token });
  if (blacklistedToken)
    throw new UnauthorizedException("Token under blacklist- Access Denied");

  next();
};

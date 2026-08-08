import type { Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "../exceptions/HTTP.exception.js";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { blacklistModel } from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new BadRequestException("All fields are mendatory");

  //hash passowrd
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.HASH_SALT!),
  );

  //load to db
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  //sign jwt
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "3h" },
  );
  
  //store to cookies
  res.cookie("userToken", token);

  res.status(201).json({ 
    status: "success", 
    user: {
      email: user.email,
      username: user.username
    } 
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if(!email || !password)
    throw new BadRequestException("All fields are mendatory");

  //check password
  const user = await userModel.findOne({ email });
  if(!user)
    throw new UnauthorizedException("Wrong email address");

  const storedPassword = user?.password;
  const isValidPassword = await bcrypt.compare(password, storedPassword!);
  if(!isValidPassword)
    throw new UnauthorizedException("Wrong password");

  //sign jwt
  const token = jwt.sign({
    id: user?._id
  }, process.env.JWT_SECRET as string, {
    expiresIn: "3h"
  })

  //store to cookies
  res.cookie("userToken", token)

  res.status(200).json({
    status: "success",
    user: {
      email: user.email,
      username: user.username,
    },
  });
}

export const logout = async (req: Request, res:Response): Promise<void> => {
  const token = req.cookies.userToken;
  await blacklistModel.create({ token });

  res.clearCookie("userToken");
  res.status(200).json({status: "success", message: "Logged out"});
}

export const getUserDetails = async (req: Request, res:Response): Promise<void> => {
  const userData = await userModel.findById( req.user.id );

  res.status(200).json({
    status: "success", 
    user: {
      email: userData?.email,
      username: userData?.username
    }
  })
}

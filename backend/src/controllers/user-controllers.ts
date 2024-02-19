import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME, DOMAIN } from "../utils/constants.js";

async function setCookie(res, user) {
  await res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    domain: DOMAIN,
    signed: true,
    path: '/',
  });

  const token = createToken(user._id.toString(), user.email, '30d');
  const expires = new Date()
  expires.setDate(expires.getDate() + 30);
  await res.cookie(COOKIE_NAME, token, {
    path: "/",
    domain: DOMAIN,
    expires,
    httpOnly: true,
    signed: true
  })
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "User does not exists" });
    }
    // Verify Password
    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect Password" });
    }

    await setCookie(res, user);

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });

  } catch (error) {
    console.log(error);

    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(401).json({ message: "User already registered!" });
    }
    const hashedPassword = await hash(password, 10)
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    await setCookie(res, user);

    return res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);

    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
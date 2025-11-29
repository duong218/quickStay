/*
import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: "not authenticated" });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};
*/

import { getAuth } from "@clerk/express";

export const protect = (req, res, next) => {
  try {
    const { userId, sessionId } = getAuth(req);

    if (!userId || !sessionId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.auth = { userId };
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
};


// File: server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 1. Check karein ki Authorization header hai aur 'Bearer' se shuru hota hai
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // 2. Token ko header se nikaalein ('Bearer ' string ko hata kar)
      token = req.headers.authorization.split(" ")[1];
    } 
    // Agar header nahi hai, toh cookie check kar sakte hain (optional)
    // else if (req.cookies.jwt) {
    //   token = req.cookies.jwt;
    // }

    if (!token) {
      // YEH ERROR AAPKO AA RAHA HAI
      return res.status(401).json({ success: false, message: "jwt must be provided" });
    }

    // 3. Token ko verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // 4. User ko database se fetch karein (bina password ke)
    const user = await User.findById(decoded.userId || decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 5. User ko request object (req.user) mein daal dein
    req.user = user;
    next(); // Agle function (controller) par jaayein

  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
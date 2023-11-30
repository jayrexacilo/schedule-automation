import { COOKIE_NAME } from "../../../../constants";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export default async function GET(req, res) {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json(
      {
        message: "Unauthorized",
      }
    );
  }

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    const check = verify(token, secret);

    const response = {
      user: "Super Top Secret User",
    };

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}

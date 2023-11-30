import { COOKIE_NAME } from "../../../../constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";


const MAX_AGE = 60 * 60 * 24 * 30; // days;

export default async function POST(request: Request, response: Response) {
  const body = request.body;

  const { username, password } = body;
  console.log('user name ', username);
  console.log('password', password);

  if (username !== "admin" || password !== "admin") {
    return response.status(401).json(
      {
        message: "Unauthorized",
      }
    );
  }

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const result = {
    message: "Authenticated!",
  };

  return response
  .setHeader('Set-Cookie', serialized)
  .status(200)
  .json(result);
}

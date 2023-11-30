import { COOKIE_NAME } from "../../../../constants";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export default async function GET(req, res) {
  const token = req.cookies[COOKIE_NAME];

  console.log('logout & token => ', token);
  if (!token) {
    return res.status(401).json(
      {
        message: "Unauthorized",
      }
    );
  }

  req.cookies[COOKIE_NAME] = '';

  const serialized = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return res
  .setHeader('Set-Cookie', serialized)
  .status(200)
  .json({message: 'success'});
}

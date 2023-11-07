import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { email, password } = requestBody;

    console.log(requestBody);

    //check if user already exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't Exists" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });


    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });

    //set this token in users response cookie
    response.cookies.set("token", token, { httpOnly: true });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

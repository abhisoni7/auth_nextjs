import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userID = await getDataFromToken(request);

    const user = await User.findOne({ _id: userID }).select(
      "-password -isAdmin"
    );

    return NextResponse.json({message : "user found", data: user});

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

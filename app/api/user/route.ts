import connect from "@/lib/db";
import User from "@/lib/models/User";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse JSON directly from the request body
    const { firstName, lastName, email } = await req.json();

    await connect();
    const user = await User.findOne({ email });
    if (user) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email,
    });
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User added successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error adding user", error: error.message }),
      { status: 500 }
    );
  }
};

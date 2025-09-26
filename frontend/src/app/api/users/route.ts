import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ✅ POST: create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, wallet_address, full_name, username, phone } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // 🔎 Check if email exists
    const { data: existingEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, wallet_address, full_name, username, phone }])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: data[0],
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

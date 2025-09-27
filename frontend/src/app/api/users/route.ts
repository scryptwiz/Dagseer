import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ✅ GET: get user by wallet address
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet_address = searchParams.get("address");

    if (!wallet_address) {
      return NextResponse.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("wallet_address", wallet_address)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    if (data) {
      return NextResponse.json(
        {
          success: true,
          message: "User found",
          data: { id: data.id },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ✅ POST: create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, wallet_address, full_name, username, phone } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
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
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: data[0],
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

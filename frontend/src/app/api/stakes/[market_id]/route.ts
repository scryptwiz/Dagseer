import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { market_id: string } }
) {
  try {
    const marketId = params.market_id;
    const { searchParams } = new URL(req.url);
    const wallet_address = searchParams.get("address");

    if (!wallet_address) {
      return NextResponse.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Get user id from wallet
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("wallet_address", wallet_address)
      .maybeSingle();

    if (userError) {
      return NextResponse.json(
        { success: false, message: userError.message },
        { status: 500 }
      );
    }

    // If user not registered → return hasStaked false
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "User not registered",
          hasStaked: false,
          stake: null,
        },
        { status: 200 }
      );
    }

    // Check if user has staked in this market
    const { data: stake, error: stakeError } = await supabase
      .from("stakes")
      .select("id, amount, choice, status, created_at")
      .eq("user_id", user.id)
      .eq("market_id", marketId)
      .maybeSingle();

    if (stakeError) {
      return NextResponse.json(
        { success: false, message: stakeError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Stake status fetched",
        hasStaked: !!stake,
        stake, // null if user never staked
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

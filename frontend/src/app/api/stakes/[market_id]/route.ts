import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request, { params }: { params: { market_id: string } }) {
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

    // Get user id from wallet (limit 2 to detect duplicates without throwing)
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("wallet_address", wallet_address)
      .limit(2);

    if (userError) {
      return NextResponse.json({ success: false, message: userError.message }, { status: 500 });
    }

    if (!users || users.length === 0) {
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

    if (users.length > 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate wallet entries found. Please contact support.",
        },
        { status: 500 }
      );
    }

    const user = users[0];

    // Check if user has staked in this market
    const { data: stakeRows, error: stakeError } = await supabase
      .from("stakes")
      .select("id, amount, choice, status, created_at")
      .eq("user_id", user.id)
      .eq("market_id", marketId)
      .order("created_at", { ascending: true })
      .limit(2);

    if (stakeError) {
      return NextResponse.json({ success: false, message: stakeError.message }, { status: 500 });
    }

    let stake = null;
    if (stakeRows && stakeRows.length > 0) {
      stake = stakeRows[0];
      if (stakeRows.length > 1) {
        // signal data integrity issue but still return first record
        return NextResponse.json(
          {
            success: true,
            message: "Multiple stakes found; returning earliest.",
            hasStaked: true,
            stake,
            duplicate: true,
          },
          { status: 200 }
        );
      }
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

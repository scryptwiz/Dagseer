import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, market_id, amount, choice } = body;

    if (!user_id || !market_id || !amount || !choice) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user has already staked on this market
    const { data: existingStake } = await supabase
      .from("stakes")
      .select("id")
      .eq("user_id", user_id)
      .eq("market_id", market_id)
      .maybeSingle();

    if (existingStake) {
      return NextResponse.json(
        { success: false, message: "User has already staked on this market" },
        { status: 409 }
      );
    }

    // 1. Fetch market to check validity
    const { data: market, error: marketError } = await supabase
      .from("markets")
      .select("start_date, end_date, is_active")
      .eq("id", market_id)
      .single();

    if (marketError || !market) {
      return NextResponse.json({ success: false, message: "Market not found" }, { status: 404 });
    }

    // 2. Check if market is active
    const now = new Date();
    const start = new Date(market.start_date);
    const end = new Date(market.end_date);

    if (!market.is_active) {
      return NextResponse.json(
        { success: false, message: "Market is not active" },
        { status: 400 }
      );
    }

    if (now < start) {
      return NextResponse.json(
        { success: false, message: "Market has not started yet" },
        { status: 400 }
      );
    }

    if (now > end) {
      return NextResponse.json(
        { success: false, message: "Market has already ended" },
        { status: 400 }
      );
    }

    // 3. Insert stake
    const { data, error } = await supabase
      .from("stakes")
      .insert([{ user_id, market_id, amount, choice }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Stake created successfully", stake: data },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// ========== GET STAKES ==========
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const market_id = searchParams.get("market_id");

    let query = supabase.from("stakes").select(`
      id,
      amount,
      choice,
      status,
      created_at,
      user_id,
      market_id,
      users(email, username, wallet_address),
      markets(title, category_id, start_date, end_date)
    `);

    if (user_id) {
      query = query.eq("user_id", user_id);
    }

    if (market_id) {
      query = query.eq("market_id", market_id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, stakes: data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 403 });
    }

    const body = await req.json();
    const { winningChoice } = body; // "yes" or "no"

    if (!winningChoice) {
      return NextResponse.json(
        { success: false, message: "Winning choice is required" },
        { status: 400 }
      );
    }

    const marketId = params.id;

    // ✅ Ensure market exists and is active
    const { data: market, error: marketError } = await supabase
      .from("markets")
      .select("id, is_active")
      .eq("id", marketId)
      .single();

    if (marketError || !market) {
      return NextResponse.json({ success: false, message: "Market not found" }, { status: 404 });
    }

    if (!market.is_active) {
      return NextResponse.json(
        { success: false, message: "Market already closed" },
        { status: 400 }
      );
    }

    // ✅ Update winners
    const { error: winError } = await supabase
      .from("stakes")
      .update({ status: "won" })
      .eq("market_id", marketId)
      .eq("choice", winningChoice)
      .eq("status", "pending");

    if (winError) {
      return NextResponse.json({ success: false, message: winError.message }, { status: 500 });
    }

    // ✅ Update losers
    const { error: loseError } = await supabase
      .from("stakes")
      .update({ status: "lost" })
      .eq("market_id", marketId)
      .neq("choice", winningChoice)
      .eq("status", "pending");

    if (loseError) {
      return NextResponse.json({ success: false, message: loseError.message }, { status: 500 });
    }

    // ✅ Close market after settlement
    const { error: marketCloseError } = await supabase
      .from("markets")
      .update({ is_active: false })
      .eq("id", marketId);

    if (marketCloseError) {
      return NextResponse.json(
        { success: false, message: marketCloseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Market settled. Winning choice: ${winningChoice}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

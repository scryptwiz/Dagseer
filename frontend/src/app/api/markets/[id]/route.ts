// app/api/markets/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust import path

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const marketId = params.id;

    // Fetch market + category
    const { data: market, error: marketError } = await supabase
      .from("markets")
      .select(
        `
        id,
        title,
        description,
        min_stake,
        max_stake,
        is_active,
        start_date,
        end_date,
        trending,
        created_at,
        updated_at,
        category:category_id ( id, name )
      `
      )
      .eq("id", marketId)
      .single();

    if (marketError) {
      return NextResponse.json(
        { success: false, error: marketError.message },
        { status: 500 }
      );
    }

    if (!market) {
      return NextResponse.json(
        { success: false, message: "Market not found" },
        { status: 404 }
      );
    }

    // Fetch stakes for this market
    const { data: stakes, error: stakesError } = await supabase
      .from("stakes")
      .select("amount, choice")
      .eq("market_id", marketId);

    if (stakesError) {
      return NextResponse.json(
        { success: false, error: stakesError.message },
        { status: 500 }
      );
    }

    // Aggregate stats
    const yesCount = stakes.filter(
      (s) => s.choice.toLowerCase() === "yes"
    ).length;
    const noCount = stakes.filter(
      (s) => s.choice.toLowerCase() === "no"
    ).length;

    const totalStakers = stakes.length;
    const totalAmount = stakes.reduce((sum, s) => sum + Number(s.amount), 0);

    const marketWithStats = {
      ...market,
      stats: {
        yesCount,
        noCount,
        totalStakers,
        totalAmount,
      },
    };

    return NextResponse.json(
      {
        success: true,
        message: "Market fetched successfully",
        data: marketWithStats,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

// GET markets
export async function GET() {
  try {
    const { data: markets, error: marketError } = await supabase.from("markets")
      .select(`
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
      `);

    if (marketError) {
      return NextResponse.json(
        { success: false, error: marketError.message },
        { status: 500 }
      );
    }

    // Fetch stakes for all markets
    const { data: stakes, error: stakesError } = await supabase
      .from("stakes")
      .select("market_id, amount, choice");

    if (stakesError) {
      return NextResponse.json(
        { success: false, error: stakesError.message },
        { status: 500 }
      );
    }

    // Aggregate stakes per market
    const marketsWithStats = markets.map((market) => {
      const marketStakes = stakes.filter((s) => s.market_id === market.id);

      const yesCount = marketStakes.filter(
        (s) => s.choice.toLowerCase() === "yes"
      ).length;
      const noCount = marketStakes.filter(
        (s) => s.choice.toLowerCase() === "no"
      ).length;

      const totalStakers = marketStakes.length;
      const totalAmount = marketStakes.reduce(
        (sum, s) => sum + Number(s.amount),
        0
      );

      return {
        ...market,
        stats: {
          yesCount,
          noCount,
          totalStakers,
          totalAmount,
        },
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: "Markets fetched successfully",
        data: marketsWithStats,
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

// POST new market
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
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
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { data, error } = await supabase
      .from("markets")
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Market created successfully", data },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getClientLogos } from "@/lib/data-service";

export async function GET() {
  try {
    const clients = await getClientLogos();
    return NextResponse.json({ success: true, count: clients.length, data: clients });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

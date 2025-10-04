import { NextResponse } from "next/server";
import { getDigitalGuests } from "@/server/services/guests.service";

export async function GET() {
  try {
    const guests = await getDigitalGuests();
    return NextResponse.json({ guests }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ guests: [], error: "failed_to_fetch" }, { status: 500 });
  }
}
